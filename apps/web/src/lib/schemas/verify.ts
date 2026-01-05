import { z } from "zod";

export const VerifyStatusSchema = z.enum(["qualified", "inconclusive", "disqualified"]);
export type VerifyStatus = z.infer<typeof VerifyStatusSchema>;

export const VerifyInputTypeSchema = z.enum(["code", "qr", "certificate"]);
export type VerifyInputType = z.infer<typeof VerifyInputTypeSchema>;

export const VerifyResultSchema = z.object({
  productId: z.string(),
  itemName: z.string(),
  signatures: z.number().int().min(0),
  status: VerifyStatusSchema,
  date: z.string(),
  certificate: z.string(),
  authenticationResult: z.string(),
  dateOfAnalysis: z.string(),
});

export const VerifyHistoryEntrySchema = z.object({
  productId: z.string(),
  result: VerifyStatusSchema,
  timestamp: z.number(),
});

export const VerifyRunInputSchema = z.object({
  inputType: VerifyInputTypeSchema,
  code: z.string().min(1),
});

export const VerifyMappingEntrySchema = z.object({
  status: VerifyStatusSchema,
  signatures: z.number().int().min(0).optional(),
  itemName: z.string().optional(),
  certificate: z.string().optional(),
});

export type VerifyResult = z.infer<typeof VerifyResultSchema>;
export type VerifyHistoryEntry = z.infer<typeof VerifyHistoryEntrySchema>;
export type VerifyRunInput = z.infer<typeof VerifyRunInputSchema>;
export type VerifyMappingEntry = z.infer<typeof VerifyMappingEntrySchema>;

