'use client';

import type { EmblaOptionsType } from 'embla-carousel';
import useEmblaCarousel from 'embla-carousel-react';
import Image from 'next/image';
import { useCallback, useEffect, useState } from 'react';
import { useWindowSize } from 'usehooks-ts';

import {
  NextButton,
  PrevButton,
  usePrevNextButtons,
} from '@/components/product-image-gallery/carousel-arrow-buttons';
import { Thumb } from '@/components/product-image-gallery/carousel-thumbs-button';
import { cn } from '@/lib/utils';
import type { ProductImageType } from '@/types';
import './carousel.css';

const WINDOW_SIZE_DEBOUNCE_DELAY = 100;
const MD_BREAKPOINT = 768;

type CarouselType = {
  slides: ProductImageType[];
  isInModal?: boolean;
  options?: EmblaOptionsType;
};

export function Carousel({ slides, isInModal = false, options }: CarouselType) {
  const { width: windowWidth = 0 } = useWindowSize({
    initializeWithValue: false,
    debounceDelay: WINDOW_SIZE_DEBOUNCE_DELAY,
  });

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

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = usePrevNextButtons(emblaMainApi);

  return (
    <div className="embla mx-auto w-full md:max-w-[720px] lg:mx-0 lg:max-w-[445px]">
      <div
        ref={emblaMainRef}
        className="embla__viewport relative md:rounded-[15px]"
      >
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
        <PrevButton
          className={cn(
            'absolute left-0 top-1/2 h-10 w-10 -translate-y-1/2 translate-x-4 rounded-full bg-white stroke-very-dark-blue transition-colors duration-300 hover:stroke-orange',
            { 'h-14 w-14 -translate-x-1/2': isInModal },
            { hidden: windowWidth >= MD_BREAKPOINT && !isInModal },
          )}
          onClick={onPrevButtonClick}
          disabled={prevBtnDisabled}
        />
        <NextButton
          className={cn(
            'absolute right-0 top-1/2 h-10 w-10 -translate-x-4 -translate-y-1/2 rounded-full bg-white stroke-very-dark-blue transition-colors duration-300 hover:stroke-orange',
            { 'h-14 w-14 translate-x-1/2': isInModal },
            { hidden: windowWidth >= MD_BREAKPOINT && !isInModal },
          )}
          onClick={onNextButtonClick}
          disabled={nextBtnDisabled}
        />
      </div>
      {/* Thumbs container */}
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
