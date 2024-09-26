'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { selectProductById } from '@/lib/redux-store/features/products';
import { useAppSelector } from '@/lib/redux-store/hooks';
import { Carousel } from './carousel';
import { CloseIcon } from './close-icon';
import { FullscreenIcon } from './fullscreen-icon';

type ProductImageGalleryProps = {
  productId: string;
};

export function ProductImageGallery({ productId }: ProductImageGalleryProps) {
  const product = useAppSelector((state) =>
    selectProductById(state, productId),
  );
  if (!product) return null;

  return (
    <div className="relative">
      <Carousel
        key="product-carousel--static"
        slides={product.images}
        isInModal={false}
        carouselOptions={{ loop: false }}
        autoplayOptions={{ playOnInit: false }}
      />
      <Dialog>
        <DialogTrigger asChild>
          <Button
            aria-label="Click to enlarge image"
            className="absolute right-6 top-6 hidden lg:inline-flex"
          >
            <FullscreenIcon className="stroke-white transition-colors duration-300 hover:stroke-very-dark-blue" />
          </Button>
        </DialogTrigger>
        <DialogContent className="fixed left-[50%] top-[50%] z-50 grid w-full max-w-[calc(550px+88px)] translate-x-[-50%] translate-y-[-50%] bg-transparent p-11">
          <DialogHeader className="sr-only">
            <DialogTitle>Product Image Gallery</DialogTitle>
            <DialogDescription>
              This is a product image gallery
            </DialogDescription>
          </DialogHeader>
          <DialogClose asChild>
            <Button
              aria-label="Click to close"
              className="absolute right-11 top-0"
            >
              <CloseIcon className="fill-white transition-colors duration-300 hover:fill-orange" />
            </Button>
          </DialogClose>
          <Carousel
            key="product-carousel--modal"
            slides={product.images}
            isInModal={true}
            carouselOptions={{ loop: true }}
            autoplayOptions={{
              playOnInit: true,
              stopOnMouseEnter: true,
              stopOnInteraction: false,
              delay: 4000,
            }}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}
