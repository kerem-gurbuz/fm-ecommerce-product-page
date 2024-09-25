import { z } from 'zod';

import { productImageSchema, productSchema } from '@/lib/schemas/product';

export type ProductType = z.infer<typeof productSchema>;
export type ProductImageType = z.infer<typeof productImageSchema>;
