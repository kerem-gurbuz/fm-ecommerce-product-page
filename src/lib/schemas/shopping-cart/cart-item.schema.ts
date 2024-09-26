import { z } from 'zod';

import { productSchema } from '@/lib/schemas/product';

export const cartItemSchema = z.object({
  id: z.string(),
  product: productSchema,
  quantity: z.number().int().positive({
    message: 'Quantity must be a positive integer.',
  }),
});
