export type NavItem = { label: string; href: string };

export const items: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about-us" },
  { label: "Meetings", href: "/meetings" },
  { label: "About The Conditions", href: "/about-the-conditions" },
  { label: "Resources", href: "/resources" },
  { label: "Newsletters", href: "/newsletters" },
  { label: "Contact Us", href: "/contact-us" },
];

export const isActive = (currentPath: string, href: string) =>
  href === "/" ? currentPath === "/" : currentPath === href || currentPath.startsWith(href + "/");
