import { z } from 'zod';

import { cartItemSchema } from '@/lib/schemas/shopping-cart';

export const cartSchema = z.object({
  cartItems: z.array(cartItemSchema),
  totalQuantity: z.number().int(),
  totalPrice: z.number(),
});
