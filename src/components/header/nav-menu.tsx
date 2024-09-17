'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useWindowSize } from 'usehooks-ts';

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { NAVIGATION_LINKS } from '@/lib/constants/navigation-links';
import { cn } from '@/lib/utils';

type NavMenuProps = {
  className?: React.ComponentProps<'div'>['className'];
  trigger: React.ReactNode;
};

// Auto close on window resize
const WINDOW_SIZE_DEBOUNCE_DELAY = 200;
const MD_BREAKPOINT = 768;

export function NavMenu({ className, trigger }: NavMenuProps) {
  const [open, setOpen] = useState<boolean>(false);
  const pathname = usePathname();
  const { width: windowWidth } = useWindowSize({
    initializeWithValue: false,
    debounceDelay: WINDOW_SIZE_DEBOUNCE_DELAY,
  });

  useEffect(() => {
    if (windowWidth && windowWidth >= MD_BREAKPOINT) {
      setOpen(() => false);
    }
  }, [windowWidth]);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger className="pb-[4px] pt-[5px] md:hidden">
        <span className="sr-only">Open navigation menu</span>
        {trigger}
      </SheetTrigger>
      <SheetContent
        side="left"
        className={cn('border-none bg-white p-[25px]', className)}
      >
        <SheetHeader className="sr-only">
          <SheetTitle>Navigation menu</SheetTitle>
          <SheetDescription>
            This is a navigation menu for mobile devices
          </SheetDescription>
        </SheetHeader>
        <nav className="mt-[67px] h-full w-full">
          <ul className="flex flex-col gap-5">
            {Object.values(NAVIGATION_LINKS).map(({ href, label }, idx) => {
              const isActive = pathname === href;
              return (
                <li key={idx}>
                  <Link
                    href={href}
                    className={cn(
                      'flex text-[18px] leading-[26px] text-dark-grayish-blue transition-all duration-300 hover:text-very-dark-blue',
                      {
                        'border-r-4 border-r-orange text-very-dark-blue':
                          isActive,
                      },
                    )}
                  >
                    {label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </SheetContent>
    </Sheet>
  );
}
