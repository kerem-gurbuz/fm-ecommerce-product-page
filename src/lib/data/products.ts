import type { ProductDetailsType } from '@/models/types';

export const PRODUCTS: ProductDetailsType[] = [
  {
    id: 'product-1',
    company: 'Sneaker Company',
    name: 'Fall Limited Edition Sneakers',
    description:
      "These low-profile sneakers are your perfect casual wear companion. Featuring a durable rubber outer sole, they'll withstand everything the weather can offer.",
    price: 250,
    discountPercentage: 50,
    images: [
      {
        src: '/assets/images/product-1-image-1.jpg',
        thumbnail: '/assets/images/product-1-image-1-thumbnail.jpg',
      },
      {
        src: '/assets/images/product-1-image-2.jpg',
        thumbnail: '/assets/images/product-1-image-2-thumbnail.jpg',
      },
      {
        src: '/assets/images/product-1-image-3.jpg',
        thumbnail: '/assets/images/product-1-image-3-thumbnail.jpg',
      },
      {
        src: '/assets/images/product-1-image-4.jpg',
        thumbnail: '/assets/images/product-1-image-4-thumbnail.jpg',
      },
    ],
  },
];
