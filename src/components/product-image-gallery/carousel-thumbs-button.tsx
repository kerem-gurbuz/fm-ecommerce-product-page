import Image from 'next/image';

import { cn } from '@/lib/utils';
import type { ProductImageType } from '@/models/types';

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
        'relative aspect-square h-[88px] overflow-hidden rounded-[10px] bg-white transition-colors duration-300 hover:cursor-pointer',
        { 'border-2 border-orange': selected },
      )}
    >
      <Image
        src={slide.thumbnail}
        alt={`Product image ${index + 1}`}
        className={cn(
          'object-cover object-center transition-opacity duration-300 hover:opacity-50',
          { 'opacity-25': selected },
        )}
        sizes="88px"
        quality={75}
        fill
      />
    </div>
  );
}
