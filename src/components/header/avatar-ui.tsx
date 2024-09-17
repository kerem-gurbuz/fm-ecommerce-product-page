import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';

type AvatarUIProps = {
  className?: React.ComponentProps<'span'>['className'];
  imageSrc: string;
  userName: string;
};

export function AvatarUI({ className, imageSrc, userName }: AvatarUIProps) {
  return (
    <Avatar
      className={cn('cursor-pointer transition-all duration-100', className)}
    >
      <AvatarImage src={imageSrc} alt={`${userName}'s avatar`} />
      <AvatarFallback className="text-base font-bold md:text-xl">
        {userName.charAt(0).toUpperCase()}
      </AvatarFallback>
    </Avatar>
  );
}
