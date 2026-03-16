// Navigation data is generated from registry at build time
// Run `bun run prebuild` to regenerate
import navigationData from './navigation-data.json';

export interface NavLink {
  title: string;
  href: string;
}

export interface NavGroup {
  title: string;
  links: NavLink[];
  collapsed: boolean;
}

export type NavItem = NavLink | NavGroup;

export interface NavSection {
  title: string;
  links: NavItem[];
}

export const navigation = navigationData as NavSection[];
