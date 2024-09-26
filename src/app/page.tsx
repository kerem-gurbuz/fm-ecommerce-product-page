import { ProductDetailsCard } from '@/components/product-details-card';
import { ProductImageGallery } from '@/components/product-image-gallery';

export default function ProductPage() {
  const PRODUCT_ID = 'product-1'; // Read from the page params

  return (
    <main
      id="product-page"
      className="flex-1 pb-[88px] md:pb-[132px] md:pt-[90px]"
    >
      <div className="mx-auto max-w-[1015px] lg:px-5 xl:px-0">
        <div className="grid grid-cols-1 grid-rows-[auto_1fr] justify-items-center md:gap-8 lg:grid-cols-2 lg:grid-rows-1 lg:items-center lg:gap-0">
          <div className="w-full md:max-w-[720px] lg:max-w-[445px] lg:justify-self-start">
            <ProductImageGallery productId={PRODUCT_ID} />
          </div>
          <div className="w-full p-6 pb-0 md:max-w-[720px] md:p-0 lg:max-w-[445px] lg:justify-self-end">
            <ProductDetailsCard productId={PRODUCT_ID} />
          </div>
        </div>
      </div>
    </main>
  );
}
