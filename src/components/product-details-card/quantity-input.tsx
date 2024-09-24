'use client';

import { useState } from 'react';

import { MinusIcon } from '@/components/product-details-card/minus-icon';
import { PlusIcon } from '@/components/product-details-card/plus-icon';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

type QuantityInputProps = {
  className?: React.ComponentProps<'div'>['className'];
};

export function QuantityInput({ className }: QuantityInputProps) {
  const [quantity, setQuantity] = useState(0);

  const handleDecrement = () => {
    setQuantity((prev) => prev - 1);
  };

  const handleIncrement = () => {
    setQuantity((prev) => prev + 1);
  };

  return (
    <div className={cn('relative', className)}>
      <Button
        aria-label="Decrement quantity"
        className="absolute left-6 top-1/2 -translate-y-1/2"
        disabled={quantity === 0}
        onClick={handleDecrement}
      >
        <MinusIcon width={12} height={3.33} />
      </Button>
      <Label htmlFor="quantity" className="sr-only">
        Quantity
      </Label>
      <Input
        id="quantity"
        name="quantity"
        type="number"
        className="h-full rounded-[10px] border-none bg-pale-sky text-center text-[16px] font-bold leading-[19.84px] text-very-dark-blue"
        value={quantity}
        readOnly
      />
      <Button
        aria-label="Increment quantity"
        className="absolute right-6 top-1/2 -translate-y-1/2"
        onClick={handleIncrement}
      >
        <PlusIcon width={12} height={12} />
      </Button>
    </div>
  );
}
