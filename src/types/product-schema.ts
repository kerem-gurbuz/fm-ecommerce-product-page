import { z } from 'zod';

export const productImageSchema = z
  .object({ src: z.string(), thumbnail: z.string() })
  .strict();

export type ProductImageType = z.infer<typeof productImageSchema>;

export const productSchema = z
  .object({
    id: z.string({
      required_error: 'Product ID is required',
      invalid_type_error: 'Product ID must be a string',
    }),
    name: z.string().min(2, {
      message: 'Product name must be at least 2 characters',
    }),
    images: z.array(productImageSchema).min(1, {
      message: 'Product must have at least one image',
    }),
    price: z.number().positive({
      message: 'Product price must be greater than 0',
    }),
  })
  .strict();

export type ProductType = z.infer<typeof productSchema>;
