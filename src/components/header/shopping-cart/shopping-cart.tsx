'use client';

import { useWindowSize } from 'usehooks-ts';

import { CartItem } from '@/components/header/shopping-cart';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import type { CartItemType } from '@/types';

const WINDOW_SIZE_DEBOUNCE_DELAY = 100;
const MD_BREAKPOINT = 768;
const LG_BREAKPOINT = 1440;

type ShoppingCartProps = {
  className?: React.ComponentProps<'div'>['className'];
  cartItems: CartItemType[];
  trigger: React.ReactNode;
};

export function ShoppingCart({
  className,
  cartItems,
  trigger,
}: ShoppingCartProps) {
  const { width: windowWidth = 0 } = useWindowSize({
    initializeWithValue: false,
    debounceDelay: WINDOW_SIZE_DEBOUNCE_DELAY,
  });

  const calculateSideOffset = () => {
    return windowWidth < MD_BREAKPOINT ? 32 : 16;
  };

  const calculateAlignOffset = () => {
    if (windowWidth < MD_BREAKPOINT) return -64;
    if (windowWidth < LG_BREAKPOINT) return -96;
    return 0;
  };

  return (
    <Popover>
      <PopoverTrigger className="pb-[1px] pt-[3px] md:pb-[14px] md:pt-[16px]">
        {trigger}
      </PopoverTrigger>
      <PopoverContent
        className={cn(
          'overflow-hidden rounded-[10px] bg-white shadow-[0px_20px_50px_-20px_hsla(var(--color-very-dark-blue),0.5)]',
          className,
        )}
        side="bottom"
        align={windowWidth < LG_BREAKPOINT ? 'end' : 'center'}
        sideOffset={calculateSideOffset()}
        alignOffset={calculateAlignOffset()}
      >
        <ScrollArea
          type="scroll"
          scrollHideDelay={1000}
          className="h-full w-full rounded-[10px]"
        >
          <div className="border-b border-b-sky-blue p-6 pb-[27px]">
            <h2 className="text-base font-bold leading-[20px]">Cart</h2>
          </div>
          <div className="space-y-6 p-6 pb-8">
            {cartItems.map((cartItem) => (
              <CartItem key={cartItem.id} cartItem={cartItem} />
            ))}
            <Button className="hover:bg-bright-orange w-full rounded-[10px] bg-orange py-[18px] text-base font-bold leading-[20px] text-very-dark-blue transition-colors duration-300">
              Checkout
            </Button>
          </div>
        </ScrollArea>
      </PopoverContent>
    </Popover>
  );
}
