export interface Price {
  id: string;
  price: number;
  discount_price?: number;
  offers?: string;
  shop?: string;
  user_created: string;
  user_edited?: string;
  createdAt: string;
  updatedAt: string;
}
