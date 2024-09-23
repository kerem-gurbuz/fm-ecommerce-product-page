import { ProductDetailsCard } from '@/components/product-details-card/product-details-card';
import { ProductImageGallery } from '@/components/product-image-gallery';
import { PRODUCTS } from '@/lib/data/products';

// TODO: Read from the global state
const CURRENT_PRODUCT = PRODUCTS[0];

export default function HomePage() {
  return (
    <main id="homepage" className="flex-1 pb-[88px] md:pb-[132px] md:pt-[90px]">
      <div className="mx-auto max-w-[1015px] lg:px-5 xl:px-0">
        <div className="grid grid-cols-1 grid-rows-[auto_1fr] justify-items-center md:gap-8 lg:grid-cols-2 lg:grid-rows-1 lg:items-center lg:gap-0">
          <div className="w-full md:max-w-[720px] lg:max-w-[445px] lg:justify-self-start">
            <ProductImageGallery productImages={CURRENT_PRODUCT.images} />
          </div>
          <div className="w-full md:max-w-[720px] lg:max-w-[445px] lg:justify-self-end">
            <div className="space-y-6 p-6 md:space-y-8 md:p-0">
              <ProductDetailsCard productDetails={CURRENT_PRODUCT} />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
