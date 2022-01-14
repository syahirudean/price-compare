export class Store {
  constructor(
    public id: number,
    public store: string,
    public location: string,
    public price: number,
    public discount: string,
    public offer: string,
    public user: string,
    public date: string
  ) {
    this.id = id;
    this.store = store;
    this.location = location;
    this.price = price;
    this.discount = discount;
    this.offer = offer;
    this.user = user;
    this.date = date;
  }
}
