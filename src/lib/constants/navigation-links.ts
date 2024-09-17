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

export type NavigationLinks = Record<NAVIGATION_LABEL, NavigationLink>;

export const NAVIGATION_LINKS: NavigationLinks = Object.values(
  NAVIGATION_LABEL,
).reduce((acc, label) => {
  acc[label] = {
    label,
    href: `/${label.toLowerCase()}`,
  };
  return acc;
}, {} as NavigationLinks);
