import { Price } from './price';

export interface Product {
  id?: string;
  imgUrl?: string;
  brand?: string;
  description?: string;
  quantity?: string;
  lowest_price?: Price;
  price_list?: Price[];
  user?: string;
  createdAt?: string;
  updatedAt?: string;
}
