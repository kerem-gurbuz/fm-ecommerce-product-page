import { z } from 'zod';

export const cartItemSchema = z
  .object({
    id: z.string({
      required_error: 'Product ID is required',
      invalid_type_error: 'Product ID must be a string',
    }),
    productName: z
      .string({ required_error: 'Product name is required' })
      .min(2, { message: 'Product name must be at least 2 characters' }),
    imageSrc: z.string({
      required_error: "Product's image source is required",
    }),
    price: z.number().positive({ message: 'Price must be greater than 0' }),
    quantity: z
      .number()
      .positive({ message: 'Quantity must be greater than 0' }),
  })
  .strict();

export type CartItemType = z.infer<typeof cartItemSchema>;
