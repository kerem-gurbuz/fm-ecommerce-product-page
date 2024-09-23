import { z } from 'zod';

import { productImageSchema } from '@/models/schemas';

export type ProductImageType = z.infer<typeof productImageSchema>;
