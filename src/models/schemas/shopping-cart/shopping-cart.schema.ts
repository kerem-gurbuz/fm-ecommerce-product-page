import { z } from 'zod';

import { calculateCurrentPrice } from '@/lib/utils';
import { shoppingCartItemSchema } from '@/models/schemas';

export const shoppingCartSchema = z
  .object({
    items: z.array(shoppingCartItemSchema),
  })
  .transform((cart) => ({
    ...cart,
    totalPrice: cart.items.reduce((total, item) => {
      const currentPrice = calculateCurrentPrice(
        item.product.price,
        item.product.discountPercentage,
      );
      return total + currentPrice * item.quantity;
    }, 0),
  }));
