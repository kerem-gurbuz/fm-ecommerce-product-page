import { Carousel } from '@/components/product-image-gallery/carousel';
import { PRODUCTS } from '@/lib/data/products';

// const OPTIONS: EmblaOptionsType = {}
const SLIDES = PRODUCTS[0].images;

export function ProductImageGallery() {
  return <Carousel slides={SLIDES} />;
}
