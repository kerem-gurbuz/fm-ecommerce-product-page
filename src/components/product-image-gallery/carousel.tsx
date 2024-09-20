'use client';

import type { EmblaOptionsType } from 'embla-carousel';
import useEmblaCarousel from 'embla-carousel-react';
import Image from 'next/image';
import { useCallback, useEffect, useState } from 'react';

import { Thumb } from '@/components/product-image-gallery/carousel-thumbs-button';
import type { ProductImageType } from '@/types';
import './carousel.css';

type CarouselType = {
  slides: ProductImageType[];
  options?: EmblaOptionsType;
};

export function Carousel({ slides, options }: CarouselType) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [emblaMainRef, emblaMainApi] = useEmblaCarousel(options);
  const [emblaThumbsRef, emblaThumbsApi] = useEmblaCarousel({
    containScroll: 'keepSnaps',
    dragFree: true,
  });

  const onThumbClick = useCallback(
    (index: number) => {
      if (!emblaMainApi || !emblaThumbsApi) return;
      emblaMainApi.scrollTo(index);
    },
    [emblaMainApi, emblaThumbsApi],
  );

  const onSelect = useCallback(() => {
    if (!emblaMainApi || !emblaThumbsApi) return;
    setSelectedIndex(emblaMainApi.selectedScrollSnap());
    emblaThumbsApi.scrollTo(emblaMainApi.selectedScrollSnap());
  }, [emblaMainApi, emblaThumbsApi, setSelectedIndex]);

  useEffect(() => {
    if (!emblaMainApi) return;
    onSelect();

    emblaMainApi.on('select', onSelect).on('reInit', onSelect);
  }, [emblaMainApi, onSelect]);

  return (
    <div className="embla mx-auto w-full md:max-w-[720px] lg:mx-0 lg:max-w-[445px]">
      <div ref={emblaMainRef} className="embla__viewport md:rounded-[15px]">
        <div className="embla__container">
          {slides.map((slide, index) => (
            <div
              key={index}
              className="embla__slide relative h-[300px] max-h-dvh min-[445px]:h-[445px]"
            >
              <Image
                src={slide.src}
                alt={`Product image ${index + 1}`}
                className="object-cover object-top"
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 720px, 445px"
                fill
              />
            </div>
          ))}
        </div>
      </div>
      <div className="mt-8 hidden md:block">
        <div className="mx-auto w-full max-w-[445px]" ref={emblaThumbsRef}>
          <div className="flex justify-between">
            {slides.map((slide, index) => (
              <Thumb
                key={index}
                index={index}
                slide={slide}
                selected={index === selectedIndex}
                onClick={() => onThumbClick(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
