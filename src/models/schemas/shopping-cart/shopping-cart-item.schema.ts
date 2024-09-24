import { z } from 'zod';

import { productDetailsSchema } from '@/models/schemas';

export const shoppingCartItemSchema = z.object({
  id: z.string(),
  product: productDetailsSchema,
  quantity: z.number().int().positive(),
});


