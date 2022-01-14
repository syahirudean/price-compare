import { Component, Input, OnInit } from '@angular/core';
import {
  collection,
  collectionData,
  Firestore,
  orderBy,
  query,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-price-list',
  templateUrl: './price-list.component.html',
  styleUrls: ['./price-list.component.scss'],
})
export class PriceListComponent implements OnInit {
  @Input() id?: string;
  productPriceLists$?: Observable<any | undefined>;

  constructor(private firestore: Firestore) {}

  ngOnInit(): void {
    const subCollectionRef = collection(
      this.firestore,
      `products/${this.id}`,
      'stores'
    );
    this.productPriceLists$ = collectionData(
      query(subCollectionRef, orderBy('price', 'asc')),
      {
        idField: 'id',
      }
    );
  }
}
