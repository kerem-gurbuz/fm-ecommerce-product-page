import Image from 'next/image';
import Link from 'next/link';

import { AvatarUI } from '@/components/header/avatar-ui';
import { NavMenu } from '@/components/header/nav-menu';
import { Navbar } from '@/components/header/navbar';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

type HeaderProps = {
  className?: React.ComponentProps<'header'>['className'];
};

export function Header({ className }: HeaderProps) {
  return (
    <header
      id="header"
      className={cn(
        'border-b border-b-[hsl(219,35%,92%)] px-6 pb-[24px] pt-[19px] md:pb-[34px] md:pt-[28px] xl:px-0',
        className,
      )}
    >
      <div className="flex h-6 justify-between md:h-[50px]">
        <div className="flex gap-4 md:gap-14">
          <NavMenu
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
          <Navbar className="hidden md:block" />
        </div>
        <div className="flex gap-[22px] md:gap-[46px]">
          <Button className="pb-[1px] pt-[3px] md:pb-[14px] md:pt-[16px]">
            <CartIcon className="fill-dark-grayish-blue transition-colors duration-300 hover:fill-very-dark-blue" />
          </Button>
          <AvatarUI
            className="h-6 w-6 hover:border-2 hover:border-orange md:h-[50px] md:w-[50px]"
            imageSrc="/assets/images/image-avatar.png"
            userName="Kerem Gurbuz"
          />
        </div>
      </div>
    </header>
  );
}

function MenuIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="15"
      fill="none"
      fillRule="evenodd"
    >
      <path d="M16 12v3H0v-3h16Zm0-6v3H0V6h16Zm0-6v3H0V0h16Z" />
    </svg>
  );
}

function CartIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="22"
      height="20"
      fill="none"
      fillRule="evenodd"
    >
      <path d="M20.925 3.641H3.863L3.61.816A.896.896 0 0 0 2.717 0H.897a.896.896 0 1 0 0 1.792h1l1.031 11.483c.073.828.52 1.726 1.291 2.336C2.83 17.385 4.099 20 6.359 20c1.875 0 3.197-1.87 2.554-3.642h4.905c-.642 1.77.677 3.642 2.555 3.642a2.72 2.72 0 0 0 2.717-2.717 2.72 2.72 0 0 0-2.717-2.717H6.365c-.681 0-1.274-.41-1.53-1.009l14.321-.842a.896.896 0 0 0 .817-.677l1.821-7.283a.897.897 0 0 0-.87-1.114ZM6.358 18.208a.926.926 0 0 1 0-1.85.926.926 0 0 1 0 1.85Zm10.015 0a.926.926 0 0 1 0-1.85.926.926 0 0 1 0 1.85Zm2.021-7.243-13.8.81-.57-6.341h15.753l-1.383 5.53Z" />
    </svg>
  );
}
