'use client';

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import { selectProductById } from '@/lib/redux-store/features/products';
import { useAppSelector } from '@/lib/redux-store/hooks';
import { calculateCurrentPrice } from '@/lib/utils';
import { AddToCartForm } from './add-to-cart-form';

type ProductDetailsCardProps = {
  productId: string;
};

export function ProductDetailsCard({ productId }: ProductDetailsCardProps) {
  const product = useAppSelector((state) =>
    selectProductById(state, productId),
  );
  if (!product) return null;

  const { company, name, description, price, discountPercentage } = product;
  const currentPrice = calculateCurrentPrice(price, discountPercentage);

  return (
    <Card className="text-left">
      <CardHeader className="mb-[15px] space-y-4 font-bold md:mb-[32px] md:space-y-6">
        <h1 className="text-[12px] uppercase leading-[14.88px] tracking-[1.85px] text-dark-grayish-blue md:text-[13px] md:leading-[16.12px] md:tracking-[2px]">
          {company}
        </h1>
        <h2 className="text-[28px] leading-[32px] text-very-dark-blue md:text-[44px] md:leading-[48px]">
          {name}
        </h2>
      </CardHeader>
      <CardContent className="mb-[24px] space-y-6 md:mb-[32px]">
        <p className="text-[15px] leading-[25px] text-dark-grayish-blue md:text-[16px] md:leading-[26px]">
          {description}
        </p>
        <div className="flex h-[34px] items-center justify-between text-center font-bold min-[445px]:h-[68px] min-[445px]:flex-col min-[445px]:items-start">
          <div className="flex items-center gap-4">
            <span className="text-[28px] leading-[34px] text-very-dark-blue">
              ${currentPrice.toFixed(2)}
            </span>
            <span className="inline-flex h-[27px] w-[51px] items-center justify-center rounded-[6px] bg-very-dark-blue text-[16px] leading-[19.84px] text-white">
              {discountPercentage}%
            </span>
          </div>
          <span className="text-[16px] leading-[26px] text-dark-grayish-blue line-through">
            ${price.toFixed(2)}
          </span>
        </div>
      </CardContent>
      <CardFooter>
        <AddToCartForm product={product} />
      </CardFooter>
    </Card>
  );
}
