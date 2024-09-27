import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';

type AvatarUIProps = {
  className?: React.ComponentProps<'span'>['className'];
  imageSrc: string;
  userName: string;
};

export function AvatarUI({ className, userName, imageSrc }: AvatarUIProps) {
  return (
    <Avatar className={cn('cursor-pointer', className)}>
      <AvatarImage
        src={imageSrc}
        alt={`${userName}'s avatar`}
        sizes="(max-width: 768px) 24px, 50px"
      />
      <AvatarFallback className="text-base font-bold md:text-xl">
        {userName.charAt(0).toUpperCase()}
      </AvatarFallback>
    </Avatar>
  );
}
