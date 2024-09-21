import type { EmblaCarouselType } from 'embla-carousel';
import { useCallback, useEffect, useState } from 'react';

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

function PreviousIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="12"
      height="18"
      fill="none"
      fillRule="evenodd"
      strokeWidth="3"
    >
      <path d="M11 1 3 9l8 8" />
    </svg>
  );
}

export function PrevButton(props: React.ComponentPropsWithRef<'button'>) {
  const { className, children, ...restProps } = props;

  return (
    <Button className={cn('z-10', className)} {...restProps}>
      {children || <PreviousIcon />}
    </Button>
  );
}

function NextIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="13"
      height="18"
      fill="none"
      fillRule="evenodd"
      strokeWidth="3"
    >
      <path d="m2 1 8 8-8 8" />
    </svg>
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
