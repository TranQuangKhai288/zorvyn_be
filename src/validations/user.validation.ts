import { z } from 'zod';

export const updateRoleSchema = z.object({
  body: z.object({
    role: z.enum(['VIEWER', 'ANALYST', 'ADMIN']),
  })
});

export const updateStatusSchema = z.object({
  body: z.object({
    status: z.enum(['ACTIVE', 'INACTIVE']),
  })
});
