export interface MenuItem {
  id: string;
  name: string;
  description?: string;
  price: number;
  tags: string[];
}

export interface Category {
  id: string;
  name: string;
  description?: string;
  items: MenuItem[];
}