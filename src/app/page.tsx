import type { Product, WithContext } from 'schema-dts';

import { ProductDetailsCard } from '@/components/product-details-card';
import { ProductImageGallery } from '@/components/product-image-gallery';
import { PRODUCTS } from '@/lib/data/products';
import { calculateCurrentPrice } from '@/lib/utils';

// TODO: Read the dynamic route parameters.
// app/shop/[category]/[item]/page.jsx

type ProductPageProps = {
  params: { category: string; item: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export default function ProductPage({}: ProductPageProps) {
  // TODO: Fetch the product data from the server based on params.
  const product = PRODUCTS[0];

  const productImages = product.images.map(
    (productImage) => `${process.env.DEPLOYMENT_URL}${productImage.src}`,
  );
  const productCurrentPrice = calculateCurrentPrice(
    product.price,
    product.discountPercentage,
  );

  // TODO: Use the product data to generate the JSON-LD. Optionally, a utility function can be used to generate the JSON-LD for each product to clean up the code.
  const jsonLd: WithContext<Product> = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    image: productImages,
    brand: {
      '@type': 'Brand',
      name: product.company,
    },
    // TODO: Replace the placeholders with the actual values for the product.
    offers: {
      '@type': 'Offer',
      url: process.env.DEPLOYMENT_URL,
      price: productCurrentPrice,
      priceCurrency: 'USD',
      priceValidUntil: '2024-12-31',
      itemCondition: 'https://schema.org/NewCondition',
      availability: 'https://schema.org/InStock',
      // TODO: Check the stock quantity from the backend and use the most appropriate product availability option:
      // InStock: The item is in stock.
      // LimitedAvailability: The item has limited availability.
      // OutOfStock: The item is currently out of stock.
      // ...
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      reviewCount: '96',
    },
  };

  return (
    <main
      id="product-page"
      className="flex-1 pb-[88px] md:pb-[132px] md:pt-[90px]"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="mx-auto max-w-[1015px] lg:px-5 xl:px-0">
        <div className="grid grid-cols-1 grid-rows-[auto_1fr] justify-items-center md:gap-8 lg:grid-cols-2 lg:grid-rows-1 lg:items-center lg:gap-0">
          <div className="w-full md:max-w-[720px] lg:max-w-[445px] lg:justify-self-start">
            <ProductImageGallery productId={product.id} />
          </div>
          <div className="w-full p-6 pb-0 md:max-w-[720px] md:p-0 lg:max-w-[445px] lg:justify-self-end">
            <ProductDetailsCard productId={product.id} />
          </div>
        </div>
      </div>
    </main>
  );
}
