import type { EmblaCarouselType } from 'embla-carousel';
import { useCallback, useEffect, useState } from 'react';

import { NextIcon } from '@/components/product-image-gallery/next-icon';
import { PreviousIcon } from '@/components/product-image-gallery/previous-icon';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

type UsePrevNextButtonsType = {
  prevBtnDisabled: boolean;
  nextBtnDisabled: boolean;
  onPrevButtonClick: () => void;
  onNextButtonClick: () => void;
};

export const usePrevNextButtons = (
  emblaApi: EmblaCarouselType | undefined,
): UsePrevNextButtonsType => {
  const [prevBtnDisabled, setPrevBtnDisabled] = useState(true);
  const [nextBtnDisabled, setNextBtnDisabled] = useState(true);

  const onPrevButtonClick = useCallback(() => {
    if (!emblaApi) return;
    emblaApi.scrollPrev();
  }, [emblaApi]);

  const onNextButtonClick = useCallback(() => {
    if (!emblaApi) return;
    emblaApi.scrollNext();
  }, [emblaApi]);

  const onSelect = useCallback((emblaApi: EmblaCarouselType) => {
    setPrevBtnDisabled(!emblaApi.canScrollPrev());
    setNextBtnDisabled(!emblaApi.canScrollNext());
  }, []);

  useEffect(() => {
    if (!emblaApi) return;

    onSelect(emblaApi);
    emblaApi.on('reInit', onSelect).on('select', onSelect);
  }, [emblaApi, onSelect]);

  return {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  };
};

export function PrevButton(props: React.ComponentPropsWithRef<'button'>) {
  const { className, children, ...restProps } = props;
  return (
    <Button className={cn('z-10', className)} {...restProps}>
      {children || <PreviousIcon />}
    </Button>
  );
}

export function NextButton(props: React.ComponentPropsWithRef<'button'>) {
  const { className, children, ...restProps } = props;
  return (
    <Button className={cn('z-10', className)} {...restProps}>
      {children || <NextIcon />}
    </Button>
  );
}
