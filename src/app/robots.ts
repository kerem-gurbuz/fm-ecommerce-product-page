import type { MetadataRoute } from 'next';

const DEPLOYMENT_URL = process.env.DEPLOYMENT_URL!;

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: `${DEPLOYMENT_URL}/sitemap.xml`,
  };
}
