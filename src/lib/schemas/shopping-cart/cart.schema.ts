import { z } from 'zod';

import { cartItemSchema } from './cart-item.schema';

export const cartSchema = z.object({
  cartItems: z.array(cartItemSchema),
  totalQuantity: z.number().int(),
  totalPrice: z.number(),
});
