import { z } from "zod";

export const consignSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().optional(),
  country: z.string().optional(),
  itemDescription: z.string().min(10, "Item description must be at least 10 characters"),
  category: z.string().optional(),
  estimatedValue: z.number().min(0, "Estimated value must be positive").optional(),
  coaIssuer: z.string().optional(),
  howDidYouHear: z.string().optional(),
  consent: z.boolean().refine((val) => val === true, {
    message: "You must accept the terms and conditions",
  }),
});

export type ConsignFormData = z.infer<typeof consignSchema>;

