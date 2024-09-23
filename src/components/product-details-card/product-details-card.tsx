import { QuantityInput } from '@/components/product-details-card';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import { calculateCurrentPrice } from '@/lib/utils';
import type { ProductDetailsType } from '@/models/types';

type ProductDetailsCardProps = {
  productDetails: ProductDetailsType;
};

export function ProductDetailsCard({
  productDetails,
}: ProductDetailsCardProps) {
  const { company, name, description, price, discountPercentage } =
    productDetails;

  const currentPrice = calculateCurrentPrice(price, discountPercentage);

  return (
    <Card className="text-left">
      <CardHeader className="mb-[15px] space-y-4 font-bold md:mb-[32px] md:space-y-6">
        <h2 className="text-[12px] uppercase leading-[14.88px] tracking-[1.85px] text-dark-grayish-blue md:text-[13px] md:leading-[16.12px] md:tracking-[2px]">
          {company}
        </h2>
        <h3 className="text-[28px] leading-[32px] text-very-dark-blue md:text-[44px] md:leading-[48px]">
          {name}
        </h3>
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
      <CardFooter className="flex flex-col gap-4 min-[445px]:flex-row">
        <QuantityInput className="h-[56px] w-full rounded-[10px] lg:max-w-[157px]" />
        <Button className="h-[56px] w-full items-center justify-center rounded-[10px] bg-orange text-[16px] font-bold leading-[19.84px] text-very-dark-blue hover:bg-bright-orange">
          Add to cart
        </Button>
      </CardFooter>
    </Card>
  );
}
