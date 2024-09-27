import type { Metadata } from 'next';

const DEPLOYMENT_URL = process.env.DEPLOYMENT_URL!;

export const metadata: Metadata = {
  metadataBase: new URL(DEPLOYMENT_URL),
  title: {
    template: '%s | Sneakers',
    default: 'Fall Limited Edition Sneakers - Sneaker Company',
  },
  description:
    'Discover the perfect casual wear companion: our Fall Limited Edition Sneakers. Featuring a durable rubber outer sole, these low-profile sneakers are built to withstand any weather. Available in white and brown.',
  keywords: [
    'sneakers',
    'sneaker company',
    "men's shoes",
    "women's shoes",
    'fall collection',
    'limited edition sneakers',
    'casual sneakers',
    'durable sneakers',
    'comfortable',
    'rubber sole',
    'weather-resistant footwear',
  ],
  openGraph: {
    title: 'Fall Limited Edition Sneakers - 50% Off',
    description:
      'Durable, weather-resistant sneakers for casual wear. Limited Fall Edition by Sneaker Company.',
    url: DEPLOYMENT_URL,
    siteName: 'Sneaker Company',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    title: 'Fall Limited Edition Sneakers - 50% Off',
    description:
      'Durable, weather-resistant sneakers for casual wear. Limited Fall Edition by Sneaker Company.',
    site: DEPLOYMENT_URL,
    card: 'summary_large_image',
  },
  alternates: {
    canonical: '/',
  },
  creator: 'Kerem Gürbüz',
  authors: [
    {
      name: 'Kerem Gürbüz',
      url: 'https://www.linkedin.com/in/gurbuz-kerem/',
    },
  ],
};
