import { z } from 'zod';

import { cartItemSchema, cartSchema } from '@/lib/schemas/shopping-cart';

export type CartItemType = z.infer<typeof cartItemSchema>;
export type CartType = z.infer<typeof cartSchema>;
