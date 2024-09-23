'use client';

import type { EmblaOptionsType } from 'embla-carousel';
import Autoplay, { type AutoplayOptionsType } from 'embla-carousel-autoplay';
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
import type { ProductImageType } from '@/models/types';
import './carousel.css';

const WINDOW_SIZE_DEBOUNCE_DELAY = 100;
const SM_BREAKPOINT = 445;
const MD_BREAKPOINT = 768;

type CarouselType = {
  slides: ProductImageType[];
  isInModal?: boolean;
  carouselOptions?: EmblaOptionsType;
  autoplayOptions?: AutoplayOptionsType;
};

export function Carousel({
  slides,
  isInModal = false,
  carouselOptions,
  autoplayOptions,
}: CarouselType) {
  const { width: windowWidth = 0 } = useWindowSize({
    initializeWithValue: false,
    debounceDelay: WINDOW_SIZE_DEBOUNCE_DELAY,
  });

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [emblaMainRef, emblaMainApi] = useEmblaCarousel(carouselOptions, [
    Autoplay(autoplayOptions),
  ]);
  const [emblaThumbsRef, emblaThumbsApi] = useEmblaCarousel({
    containScroll: 'keepSnaps',
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
    <div className="embla relative">
      <div ref={emblaMainRef} className="embla__viewport md:rounded-[15px]">
        <div className="embla__container">
          {slides.map((slide, index) => (
            <div
              key={index}
              className={cn('embla__slide relative h-[300px] max-h-dvh', {
                'h-[445px]': SM_BREAKPOINT <= windowWidth,
                'h-[550px]': isInModal,
              })}
            >
              <Image
                src={slide.src}
                alt={`Product image ${index + 1}`}
                className="object-cover object-top"
                sizes={`(max-width: 768px) 100vw, (max-width: 1024px) 720px, ${isInModal ? '550px' : '445px'}`}
                quality={100}
                fill
              />
            </div>
          ))}
        </div>
        <PrevButton
          className={cn(
            'absolute left-0 top-1/2 h-10 w-10 -translate-y-1/2 translate-x-4 rounded-full bg-white stroke-very-dark-blue transition-colors duration-300 hover:stroke-orange',
            { 'top-[calc(550px/2)] h-14 w-14 -translate-x-1/2': isInModal },
            { hidden: MD_BREAKPOINT <= windowWidth && !isInModal },
          )}
          onClick={onPrevButtonClick}
          disabled={prevBtnDisabled}
        />
        <NextButton
          className={cn(
            'absolute right-0 top-1/2 h-10 w-10 -translate-x-4 -translate-y-1/2 rounded-full bg-white stroke-very-dark-blue transition-colors duration-300 hover:stroke-orange',
            { 'top-[calc(550px/2)] h-14 w-14 translate-x-1/2': isInModal },
            { hidden: MD_BREAKPOINT <= windowWidth && !isInModal },
          )}
          onClick={onNextButtonClick}
          disabled={nextBtnDisabled}
        />
      </div>
      {/* Thumbs container */}
      <div className="mt-8 hidden md:block">
        <div
          ref={emblaThumbsRef}
          className={cn('flex max-w-[445px] justify-between', {
            'mx-auto': isInModal,
          })}
        >
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
  );
}
