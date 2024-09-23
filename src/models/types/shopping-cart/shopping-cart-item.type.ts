import { z } from 'zod';

import { shoppingCartItemSchema } from '@/models/schemas';

export type ShoppingCartItemType = z.infer<typeof shoppingCartItemSchema>;
