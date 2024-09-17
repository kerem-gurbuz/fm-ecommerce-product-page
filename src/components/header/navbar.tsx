'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { NAVIGATION_LINKS } from '@/lib/constants/navigation-links';
import { cn } from '@/lib/utils';

type NavbarProps = {
  className?: React.ComponentProps<'nav'>['className'];
};

export function Navbar({ className }: NavbarProps) {
  const pathname = usePathname();

  return (
    <nav className={cn('pb-[11px] pt-[13px]', className)}>
      <ul className="flex h-[26px] gap-4 lg:gap-8">
        {Object.values(NAVIGATION_LINKS).map(({ label, href }, idx) => {
          const isActive = pathname === href;
          return (
            <li key={idx} className="group relative flex items-center">
              <Link
                href={href}
                className={cn(
                  'text-[15px] leading-[26px] text-dark-grayish-blue transition-colors duration-300 group-hover:text-very-dark-blue',
                  {
                    'text-very-dark-blue': isActive,
                  },
                )}
              >
                {label}
              </Link>
              <span
                className={cn(
                  'absolute -bottom-[45px] h-[4px] w-full bg-transparent transition-colors duration-300 group-hover:bg-orange',
                  {
                    'bg-orange': isActive,
                  },
                )}
              />
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
