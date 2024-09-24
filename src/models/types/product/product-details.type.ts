import { z } from 'zod';

import { productDetailsSchema } from '@/models/schemas';

export type ProductDetailsType = z.infer<typeof productDetailsSchema>;
