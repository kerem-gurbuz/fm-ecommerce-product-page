import Image from 'next/image';
import Link from 'next/link';

import {
  MenuIcon,
  NavigationBar,
  NavigationMenu,
} from '@/components/header/navigation';
import { CartIcon, ShoppingCart } from '@/components/header/shopping-cart';
import { AvatarUI, UserMenuDropdown } from '@/components/header/user-menu';
import { cn } from '@/lib/utils';

const USER_NAME = 'John Doe';
const USER_AVATAR_IMAGE_SRC = '/assets/images/image-avatar.png';

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
              <MenuIcon className="fill-dark-grayish-blue transition-colors duration-300 hover:fill-very-dark-blue" />
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
            trigger={
              <CartIcon className="fill-dark-grayish-blue transition-colors duration-300 group-hover:fill-very-dark-blue" />
            }
          />
          <UserMenuDropdown
            className="w-[175px]"
            trigger={
              <AvatarUI
                className="h-6 w-6 transition-all duration-100 hover:border-2 hover:border-orange md:h-[50px] md:w-[50px]"
                imageSrc={USER_AVATAR_IMAGE_SRC}
                userName={USER_NAME}
              />
            }
          />
        </div>
      </div>
    </header>
  );
}
