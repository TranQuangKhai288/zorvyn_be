import { z } from 'zod';

export const createTransactionSchema = z.object({
  body: z.object({
    amount: z.number().positive('Amount must be positive'),
    type: z.enum(['INCOME', 'EXPENSE']),
    category: z.string().min(1, 'Category is required'),
    date: z.string().datetime('Invalid date format (ISO 8601 string expected)'),
    notes: z.string().optional(),
  })
});

export const updateTransactionSchema = z.object({
  body: z.object({
    amount: z.number().positive().optional(),
    type: z.enum(['INCOME', 'EXPENSE']).optional(),
    category: z.string().optional(),
    date: z.string().datetime().optional(),
    notes: z.string().optional(),
  })
});
