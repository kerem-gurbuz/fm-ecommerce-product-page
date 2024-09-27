import { z } from 'zod';

export const productImageSchema = z.object({
  src: z.string(),
  thumbnail: z.string(),
});
