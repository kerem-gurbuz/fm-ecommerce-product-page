import { kumbh_sans } from '@/styles/fonts';
import '@/styles/globals.css';

export { metadata } from '@/lib/seo/metadata';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${kumbh_sans.variable}`}>
      <body className="antialiased">
        <main>{children}</main>
      </body>
    </html>
  );
}
