import { Header } from '@/components/header';
import { kumbh_sans } from '@/lib/styles/fonts';
import '@/lib/styles/globals.css';

export { metadata } from '@/lib/seo/metadata';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${kumbh_sans.variable}`}>
      <body className="antialiased">
        <div className="mx-auto flex min-h-dvh max-w-[1110px] flex-col">
          <Header />
          {children}
        </div>
      </body>
    </html>
  );
}
