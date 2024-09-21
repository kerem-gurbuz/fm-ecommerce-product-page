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
      onClick={onClick}
      className={cn(
        'rounded-[12px] border-2 border-transparent transition-colors duration-300 hover:cursor-pointer',
        { 'border-orange': selected },
      )}
    >
      <div className="relative aspect-square h-[88px] overflow-hidden rounded-[10px]">
        <Image
          src={slide.thumbnail}
          alt={`Product image ${index + 1}`}
          className={cn(
            'object-cover object-center transition-opacity duration-300 hover:opacity-50',
            { 'opacity-25': selected },
          )}
          sizes="88px"
          fill
        />
      </div>
    </div>
  );
}
