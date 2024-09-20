import type { ProductImageType, ProductType } from '@/types';

const generateProductImages = ({
  id,
  length = 1,
}: {
  id: number;
  length?: number;
}): ProductImageType[] =>
  Array.from({ length }, (_, i) => ({
    src: `/assets/images/product-${id}-image-${i + 1}.jpg`,
    thumbnail: `/assets/images/product-${id}-image-${i + 1}-thumbnail.jpg`,
  }));

export const PRODUCTS: ProductType[] = [
  {
    id: 'product-1',
    name: 'Fall Limited Edition Sneakers',
    images: generateProductImages({ id: 1, length: 4 }),
    price: 125,
  },
];
