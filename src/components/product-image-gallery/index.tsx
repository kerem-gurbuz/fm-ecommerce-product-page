import type { EmblaOptionsType } from 'embla-carousel';
import type { AutoplayOptionsType } from 'embla-carousel-autoplay';

import { Carousel } from '@/components/product-image-gallery/carousel';
import { PRODUCTS } from '@/lib/data/products';

const SLIDES = PRODUCTS[0].images;
const IS_IN_MODAL = false;
const CAROUSEL_OPTIONS: EmblaOptionsType = { loop: true };
const AUTOPLAY_OPTIONS: AutoplayOptionsType = {
  playOnInit: true,
  stopOnMouseEnter: true,
  stopOnInteraction: false,
  delay: 4000,
};

export function ProductImageGallery() {
  return (
    <Carousel
      slides={SLIDES}
      isInModal={IS_IN_MODAL}
      carouselOptions={CAROUSEL_OPTIONS}
      autoplayOptions={AUTOPLAY_OPTIONS}
    />
  );
}
