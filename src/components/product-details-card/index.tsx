import { QuantityInput } from '@/components/product-details-card/quantity-input';
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
      <CardFooter className="flex flex-col gap-4 min-[445px]:flex-row">
        <QuantityInput className="h-[56px] w-full rounded-[10px] lg:max-w-[157px]" />
        <Button className="h-[56px] w-full items-center justify-center gap-[15.54px] rounded-[10px] bg-orange hover:bg-bright-orange">
          <CartIconSVG className="scale-[0.8] fill-very-dark-blue" />
          <span className="text-[16px] font-bold leading-[19.84px] text-very-dark-blue">
            Add to cart
          </span>
        </Button>
      </CardFooter>
    </Card>
  );
}

function CartIconSVG(props: React.SVGProps<SVGSVGElement>) {
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
