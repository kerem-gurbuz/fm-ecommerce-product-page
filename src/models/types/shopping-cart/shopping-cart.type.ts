import { z } from 'zod';

import { shoppingCartSchema } from '@/models/schemas';

export type ShoppingCartType = z.infer<typeof shoppingCartSchema>;
