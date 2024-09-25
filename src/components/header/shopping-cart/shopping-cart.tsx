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
import { PRODUCTS } from '@/lib/data/products';
import type { CartItemType } from '@/lib/types/shopping-cart';
import { cn } from '@/lib/utils';

const WINDOW_SIZE_DEBOUNCE_DELAY = 100;
const MD_BREAKPOINT = 768;
const LG_BREAKPOINT = 1440;

// TODO: Read from the global state
const CART_ITEMS: CartItemType[] = [
  { id: 'cart-item-1', product: PRODUCTS[0], quantity: 3 },
];

type ShoppingCartProps = {
  className?: React.ComponentProps<'div'>['className'];
  trigger: React.ReactNode;
};

export function ShoppingCart({ className, trigger }: ShoppingCartProps) {
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
          'flex flex-col overflow-hidden rounded-[10px] bg-white shadow-[0px_20px_50px_-20px_hsla(var(--color-very-dark-blue),0.5)]',
          className,
        )}
        side="bottom"
        align={windowWidth < LG_BREAKPOINT ? 'end' : 'center'}
        sideOffset={calculateSideOffset()}
        alignOffset={calculateAlignOffset()}
      >
        <div className="border-b border-b-sky-blue p-6 pb-[27px]">
          <h2 className="text-base font-bold leading-[20px]">Cart</h2>
        </div>
        {CART_ITEMS.length > 0 ? (
          <ScrollArea
            type="scroll"
            scrollHideDelay={1000}
            className="h-full w-full flex-1 rounded-[10px]"
          >
            <div className="space-y-6 p-6 pb-8">
              {CART_ITEMS.map((cartItem) => (
                <CartItem key={cartItem.id} cartItem={cartItem} />
              ))}
              <Button className="w-full rounded-[10px] bg-orange py-[18px] text-base font-bold leading-[20px] text-very-dark-blue transition-colors duration-300 hover:bg-bright-orange">
                Checkout
              </Button>
            </div>
          </ScrollArea>
        ) : (
          <div className="flex flex-1 items-center justify-center">
            <p className="text-base font-bold leading-[26px] text-dark-grayish-blue">
              Your cart is empty.
            </p>
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
}
