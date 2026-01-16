"use client";

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const TeamFormSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  role: z.string().min(1, 'Role is required'),
  subtitle: z.string().optional(),
  description: z.string().min(1, 'Description is required'),
  order: z.number(),
});

export type TeamFormData = z.infer<typeof TeamFormSchema>;

interface TeamFormProps {
  onSubmit: (data: TeamFormData) => Promise<void>;
  initialData?: Partial<TeamFormData>;
  isSubmitting?: boolean;
}

export function TeamForm({
  onSubmit,
  initialData,
  isSubmitting = false,
}: TeamFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TeamFormData>({
    resolver: zodResolver(TeamFormSchema),
    defaultValues: initialData || {
      order: 0,
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Team Member Information</CardTitle>
          <CardDescription>Add or edit team member details</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="name">Name *</Label>
            <Input
              id="name"
              {...register('name')}
              className="mt-1"
              placeholder="Full name"
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
              placeholder="Job title or role"
            />
            {errors.role && (
              <p className="text-sm text-red-400 mt-1">{errors.role.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="subtitle">Subtitle</Label>
            <Input
              id="subtitle"
              {...register('subtitle')}
              className="mt-1"
              placeholder="Additional role information"
            />
          </div>

          <div>
            <Label htmlFor="description">Description *</Label>
            <textarea
              id="description"
              {...register('description')}
              className="mt-1 flex h-32 w-full border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              placeholder="Team member description"
            />
            {errors.description && (
              <p className="text-sm text-red-400 mt-1">
                {errors.description.message}
              </p>
            )}
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
          {isSubmitting ? 'Saving...' : 'Save Team Member'}
        </Button>
      </div>
    </form>
  );
}
