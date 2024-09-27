enum NAVIGATION_LABEL {
  COLLECTIONS = 'Collections',
  MEN = 'Men',
  WOMEN = 'Women',
  ABOUT = 'About',
  CONTACT = 'Contact',
}

export type NavigationLink = {
  label: string;
  href: string;
};

export type NavigationLinks = NavigationLink[];

export const NAVIGATION_LINKS: NavigationLinks = Object.values(
  NAVIGATION_LABEL,
).map((label) => ({
  label,
  href: `/${label.toLowerCase()}`,
}));
