import { z } from 'zod';

import { productSchema } from '@/types';

export const cartItemSchema = z
  .object({
    id: z.string({
      required_error: 'Item ID is required',
      invalid_type_error: 'Item ID must be a string',
    }),
    quantity: z
      .number()
      .positive({ message: 'Quantity must be greater than 0' }),
    product: productSchema,
  })
  .strict();

export type CartItemType = z.infer<typeof cartItemSchema>;
