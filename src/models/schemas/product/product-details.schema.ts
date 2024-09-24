import { z } from 'zod';

import { productImageSchema } from '@/models/schemas';

export const productDetailsSchema = z.object({
  id: z.string(),
  company: z.string(),
  name: z.string(),
  description: z.string(),
  price: z.number().positive(),
  discountPercentage: z.number().min(0).max(100).optional(),
  images: z.array(productImageSchema).min(1, {
    message: 'Product must have at least one image',
  }),
});
