import { Store } from './store.model';

export class ProductModel {
  constructor(
    public id: string,
    public imgUrl: string,
    public brand: string,
    public model: string,
    public amount: string,
    public user: string,
    public stores: Store[]
  ) {
    this.id = id;
    this.imgUrl = imgUrl;
    this.brand = brand;
    this.model = model;
    this.amount = amount;
    this.user = user;
    this.stores = stores;
  }
}
