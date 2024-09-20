import Image from 'next/image';

import { cn } from '@/lib/utils';
import type { ProductImageType } from '@/types';

type ThumbType = {
  index: number;
  slide: ProductImageType;
  selected: boolean;
  onClick: () => void;
};

export function Thumb({ index, slide, selected, onClick }: ThumbType) {
  return (
    <div
      className={cn(
        'rounded-[12px] border-2 border-transparent transition-colors duration-300',
        {
          'border-orange': selected,
        },
      )}
    >
      <div
        className={cn(
          'relative aspect-square h-[88px] overflow-hidden rounded-[10px] transition-opacity duration-300',
          {
            'opacity-25': selected,
          },
        )}
        onClick={onClick}
      >
        <Image
          src={slide.thumbnail}
          alt={`Product image ${index + 1}`}
          className="object-cover object-center"
          sizes="88px"
          fill
        />
      </div>
    </div>
  );
}
