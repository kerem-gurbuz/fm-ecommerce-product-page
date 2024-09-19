'use client';

import { CreditCard, LogOut, Settings, User } from 'lucide-react';
import { useWindowSize } from 'usehooks-ts';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';

const WINDOW_SIZE_DEBOUNCE_DELAY = 100;
const MD_BREAKPOINT = 768;
const LG_BREAKPOINT = 1440;

type UserMenuDropdownProps = {
  className?: React.ComponentProps<'div'>['className'];
  trigger: React.ReactNode;
};

export function UserMenuDropdown({
  className,
  trigger,
}: UserMenuDropdownProps) {
  const { width: windowWidth = 0 } = useWindowSize({
    initializeWithValue: false,
    debounceDelay: WINDOW_SIZE_DEBOUNCE_DELAY,
  });

  const calculateSideOffset = () => {
    return windowWidth < MD_BREAKPOINT ? 32 : 16;
  };

  const calculateAlignOffset = () => {
    if (windowWidth < MD_BREAKPOINT) return -16;
    return 0;
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>{trigger}</DropdownMenuTrigger>
      <DropdownMenuContent
        className={cn(
          'rounded-[10px] border-none text-[16px] leading-[26px] text-very-dark-blue shadow-[0px_20px_50px_-20px_hsla(var(--color-very-dark-blue),0.5)]',
          className,
        )}
        side="bottom"
        align={windowWidth < LG_BREAKPOINT ? 'end' : 'center'}
        sideOffset={calculateSideOffset()}
        alignOffset={calculateAlignOffset()}
      >
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <User className="mr-2 h-4 w-4" />
          <span>Profile</span>
          <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <CreditCard className="mr-2 h-4 w-4" />
          <span>Billing</span>
          <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Settings className="mr-2 h-4 w-4" />
          <span>Settings</span>
          <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
          <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
