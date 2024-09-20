import { ProductImageGallery } from '@/components/product-image-gallery';

export default function HomePage() {
  return (
    <main id="homepage" className="flex-1 pb-[88px] md:pb-[132px] md:pt-[90px]">
      <div className="mx-auto max-w-[1015px] lg:px-5 xl:px-0">
        <div className="flex flex-col lg:flex-row lg:justify-between">
          <ProductImageGallery />
          <div className="bg-red-900"></div>
        </div>
      </div>
    </main>
  );
}
