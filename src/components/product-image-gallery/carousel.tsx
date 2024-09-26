'use client';

import type { EmblaOptionsType } from 'embla-carousel';
import Autoplay, { type AutoplayOptionsType } from 'embla-carousel-autoplay';
import useEmblaCarousel from 'embla-carousel-react';
import Image from 'next/image';
import { useCallback, useEffect, useState } from 'react';
import { useWindowSize } from 'usehooks-ts';

import type { ProductImageType } from '@/lib/types/product';
import { cn } from '@/lib/utils';
import {
  NextButton,
  PrevButton,
  usePrevNextButtons,
} from './carousel-arrow-buttons';
import { Thumb } from './carousel-thumbs-button';

const WINDOW_SIZE_DEBOUNCE_DELAY = 50;
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
  const { width: windowWidth = 0, height: windowHeight = 0 } = useWindowSize({
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
              className={cn(
                'embla__slide relative h-[445px] max-h-[calc(100dvh-67px)] max-[444px]:h-[300px] md:max-h-dvh',
                { 'h-[550px]': isInModal },
              )}
            >
              <Image
                src={slide.src}
                alt={`Product image ${index + 1}`}
                className="object-cover object-top"
                sizes={`(max-width: 767px) 100vw, (max-width: 1023px) 720px, ${isInModal ? '550px' : '445px'}`}
                priority={index === 0}
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
      <div
        ref={emblaThumbsRef}
        className={cn('mt-8 hidden max-w-[445px] md:block', {
          'lg:hidden': isInModal && windowHeight < 800,
          'mx-auto': isInModal,
        })}
      >
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
  );
}
