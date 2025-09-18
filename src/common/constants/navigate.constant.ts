export interface NavItem {
  label: string;
  href: string;
  active?: boolean;
}

export const navigationItems: NavItem[] = [
  {
    label: "Artificial Societies",
    href: "/artificial-societies",
    active: true,
  },
  { label: "Features", href: "/features" },
  { label: "Use Cases", href: "/use-cases" },
];

export const navigateMarketItems: NavItem[] = [
  { label: "Home", href: "/", active: true },
  { label: "Packages", href: "/packages" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact Us", href: "/contact" },
];
