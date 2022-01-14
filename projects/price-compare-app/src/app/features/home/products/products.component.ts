import { Component, OnInit } from '@angular/core';
import {
  Firestore,
  collectionData,
  collection,
  updateDoc,
  setDoc,
  addDoc,
  doc,
  serverTimestamp,
  query,
  orderBy,
  limit,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Product } from '../../../shared/models/product';
import { Price } from '../../../shared/models/price';
import { ProductModel } from '../../../shared/models/product.model';
import { Store } from '../../../shared/models/store.model';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  products$: Observable<any[]>;
  constructor(private firestore: Firestore) {
    const afscollection = collection(this.firestore, 'products');
    this.products$ = collectionData(afscollection, { idField: 'id' });
  }

  ngOnInit(): void {}

  async getLowestPrice(product: ProductModel) {
    console.log(product);
    // console.log(stores);
    /*filter the object with the lowest price in array of stores*/
    // const lowest_price: Store = product.stores.reduce(
    //   (prev: any, current: any) => (prev.price < current.price ? prev : current)
    // );
    // const setId = (
    //   product.brand.toLowerCase() +
    //   '_' +
    //   product.model.toLowerCase() +
    //   '_' +
    //   product.amount
    // )
    //   .split(' ')
    //   .join('_');
    /* GET SUBCOLLECTION OF LOWEST PRICE AND BIND TO LOWEST_PRICE */
    // const subCollectionRef = collection(
    //   this.firestore,
    //   'products',
    //   product.id,
    //   'stores'
    // );
    // const prices$ = collectionData(
    //   query(subCollectionRef, orderBy('price', 'asc'), limit(1)),
    //   {
    //     idField: 'id',
    //   }
    // );
    // prices$.subscribe(async (price) => {
    //   const productRef = doc(this.firestore, 'products', `${product.id}`);
    //   await updateDoc(productRef, {
    //     lowest_price: price[0],
    //   })
    //     .then(() => {
    //       console.log(`${product.id} success`);
    //     })
    //     .catch((err) => {
    //       console.log(err);
    //     });
    // });
    /* DONE - CREATE A NEW DOCUMENT AND SUBCOLLECTION */
    // const productRef = doc(this.firestore, 'products', setId);
    // await setDoc(productRef, {
    //   id: setId,
    //   imgUrl: product.imgUrl,
    //   brand: product.brand,
    //   description: product.model,
    //   quantity: product.amount,
    //   // lowest_price: lowest_price,
    //   price_list: [],
    //   user: product.user,
    //   createdAt: serverTimestamp(),
    //   updatedAt: '',
    // })
    //   .then(async () => {
    //     console.log('success');
    //     /* ADD PRICES TO SUBCOLLECTION */
    //     for (let i = 0; i < product.stores.length; i++) {
    //       const ref = collection(this.firestore, 'products', setId, 'stores');
    //       console.log(product.stores[i]);
    //       let price = product.stores[i];
    //       await addDoc(ref, {
    //         id: '',
    //         price: price.price,
    //         discount_price: price.discount,
    //         offers: price.offer,
    //         user_created: "syahiruddin.daud@gmail.com",
    //         user_edited: "syahiruddin.daud@gmail.com",
    //         createdAt: new Date(parseInt(price.date)),
    //         updatedAt: new Date(parseInt(price.date)),
    //       })
    //         .then(() => {
    //           console.log('success');
    //         })
    //         .catch((err) => {
    //           console.log(err);
    //         });
    //     }
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
    /* The plan:
     3) Update the lowest price to the lowest from the subcollection */
  }
}
