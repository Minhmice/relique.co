"use client";

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const TestimonialFormSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  role: z.string().min(1, 'Role is required'),
  quote: z.string().min(1, 'Quote is required'),
  rating: z.number().min(1).max(5),
  verified: z.boolean(),
  order: z.number(),
});

export type TestimonialFormData = z.infer<typeof TestimonialFormSchema>;

interface TestimonialFormProps {
  onSubmit: (data: TestimonialFormData) => Promise<void>;
  initialData?: Partial<TestimonialFormData>;
  isSubmitting?: boolean;
}

export function TestimonialForm({
  onSubmit,
  initialData,
  isSubmitting = false,
}: TestimonialFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TestimonialFormData>({
    resolver: zodResolver(TestimonialFormSchema),
    defaultValues: initialData || {
      rating: 5,
      verified: true,
      order: 0,
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Testimonial Information</CardTitle>
          <CardDescription>Add or edit customer testimonial</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="name">Name *</Label>
            <Input
              id="name"
              {...register('name')}
              className="mt-1"
              placeholder="Customer name"
            />
            {errors.name && (
              <p className="text-sm text-red-400 mt-1">{errors.name.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="role">Role *</Label>
            <Input
              id="role"
              {...register('role')}
              className="mt-1"
              placeholder="Customer role or title"
            />
            {errors.role && (
              <p className="text-sm text-red-400 mt-1">{errors.role.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="quote">Quote *</Label>
            <textarea
              id="quote"
              {...register('quote')}
              className="mt-1 flex h-32 w-full border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              placeholder="Customer testimonial quote"
            />
            {errors.quote && (
              <p className="text-sm text-red-400 mt-1">{errors.quote.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="rating">Rating (1-5)</Label>
            <Input
              id="rating"
              type="number"
              min="1"
              max="5"
              {...register('rating', { valueAsNumber: true })}
              className="mt-1"
              placeholder="5"
            />
            {errors.rating && (
              <p className="text-sm text-red-400 mt-1">{errors.rating.message}</p>
            )}
          </div>

          <div className="flex gap-4">
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="verified"
                {...register('verified')}
                className="w-4 h-4"
              />
              <Label htmlFor="verified">Verified</Label>
            </div>
          </div>

          <div>
            <Label htmlFor="order">Display Order</Label>
            <Input
              id="order"
              type="number"
              {...register('order', { valueAsNumber: true })}
              className="mt-1"
              placeholder="0"
            />
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end gap-4">
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Saving...' : 'Save Testimonial'}
        </Button>
      </div>
    </form>
  );
}
