export interface NavItem {
  title: string;
  href: string;
  disabled?: boolean;
  external?: boolean;
  children?: NavItem[];
  description?: string;
}

export interface Breadcrumb {
  title: string;
  href: string;
}
