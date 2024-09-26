import { Header } from '@/components/header';
import { StoreProvider } from '@/components/store-provider';
import { PRODUCTS } from '@/lib/data/products';
import { kumbh_sans } from '@/lib/styles/fonts';
import '@/lib/styles/globals.css';

export { metadata } from '@/lib/seo/metadata';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Loading Initial Data
  // TODO: fetch products data from the server, then define that data as a prop on the client StoreProvider component.

  return (
    <html lang="en" className={`${kumbh_sans.variable}`}>
      <body className="antialiased">
        <StoreProvider products={PRODUCTS}>
          <div className="mx-auto flex min-h-dvh max-w-[1110px] flex-col">
            <Header />
            {children}
          </div>
        </StoreProvider>
      </body>
    </html>
  );
}
