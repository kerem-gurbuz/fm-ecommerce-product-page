import Image from 'next/image';
import Link from 'next/link';

import {
  MenuIcon,
  NavigationBar,
  NavigationMenu,
} from '@/components/header/navigation';
import { CartIcon, ShoppingCart } from '@/components/header/shopping-cart';
import { AvatarUI, UserMenuDropdown } from '@/components/header/user-menu';
import { CART_ITEMS } from '@/lib/data/cart-items';
import { cn } from '@/lib/utils';

// TODO: Implement global state management system for the shopping cart

const CART_TOTAL_QUANTITY = CART_ITEMS.reduce(
  (acc, item) => acc + item.quantity,
  0,
);

type HeaderProps = {
  className?: React.ComponentProps<'header'>['className'];
};

export function Header({ className }: HeaderProps) {
  return (
    <header
      id="header"
      className={cn(
        'border-b border-b-sky-blue px-6 pb-[24px] pt-[19px] md:pb-[34px] md:pt-[28px] xl:px-0',
        className,
      )}
    >
      <div className="flex h-6 justify-between md:h-[50px]">
        <div className="flex gap-4 md:gap-14">
          <NavigationMenu
            className="w-[250px]"
            trigger={
              <MenuIcon
                aria-label="Open navigation menu"
                className="fill-dark-grayish-blue transition-colors duration-300 hover:fill-very-dark-blue"
              />
            }
          />
          <Link href="/" className="pb-[3px] pt-[1px] md:py-[15px]">
            <Image
              src="/assets/images/logo.svg"
              alt="Sneaker Company Logo"
              width={138}
              height={20}
              priority
            />
          </Link>
          <NavigationBar className="hidden md:block" />
        </div>
        <div className="flex gap-[22px] md:gap-[46px]">
          <ShoppingCart
            className="h-[256px] w-[360px]"
            cartItems={CART_ITEMS}
            trigger={<CartIcon cartTotalQuantity={CART_TOTAL_QUANTITY} />}
          />
          <UserMenuDropdown
            className="w-[150px]"
            trigger={
              <AvatarUI
                className="h-6 w-6 hover:border-2 hover:border-orange md:h-[50px] md:w-[50px]"
                imageSrc="/assets/images/image-avatar.png"
                userName="Kerem Gurbuz"
              />
            }
          />
        </div>
      </div>
    </header>
  );
}
