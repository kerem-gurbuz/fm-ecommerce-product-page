import { Carousel } from '@/components/product-image-gallery/carousel';
import { CloseIcon } from '@/components/product-image-gallery/close-icon';
import { FullscreenIcon } from '@/components/product-image-gallery/fullscreen-icon';
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
import type { ProductImageType } from '@/lib/types/product';

type ProductImageGalleryProps = {
  productImages: ProductImageType[];
};

export function ProductImageGallery({
  productImages,
}: ProductImageGalleryProps) {
  return (
    <div className="relative">
      <Carousel
        key="product-carousel--static"
        slides={productImages}
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
            slides={productImages}
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
