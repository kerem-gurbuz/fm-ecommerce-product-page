import Image from 'next/image';

import { TrashCanIcon } from '@/components/header/shopping-cart';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardTitle } from '@/components/ui/card';
import type { CartItemType } from '@/types';

type CartItemProps = {
  cartItem: CartItemType;
};

export function CartItem({ cartItem }: CartItemProps) {
  const { productName, imageSrc, price, quantity } = cartItem;

  return (
    <Card className="flex items-center justify-between">
      <div className="flex gap-4">
        <div className="relative h-[52px] w-[50px] overflow-hidden rounded-sm">
          <Image
            src={imageSrc}
            alt={productName}
            className="object-cover object-center"
            sizes="50px"
            fill
          />
        </div>
        <div className="text-[16px] leading-[26px] text-dark-grayish-blue">
          <CardTitle>{productName}</CardTitle>
          <CardContent>
            <p className="flex justify-start gap-1">
              <span>
                ${price.toFixed(2)} x {quantity} =
              </span>
              <span className="font-bold text-very-dark-blue">
                ${(price * quantity).toFixed(2)}
              </span>
            </p>
          </CardContent>
        </div>
      </div>
      <Button aria-label="Remove item from cart">
        <TrashCanIcon width={14} height={16} />
      </Button>
    </Card>
  );
}
