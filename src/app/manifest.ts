import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Fall Limited Edition Sneakers - Sneaker Company',
    short_name: 'Sneaker Company',
    description:
      'Discover the perfect casual wear companion: our Fall Limited Edition Sneakers. Featuring a durable rubber outer sole, these low-profile sneakers are built to withstand any weather. Available in white and brown.',
    display: 'standalone',
    start_url: '/',
  };
}
