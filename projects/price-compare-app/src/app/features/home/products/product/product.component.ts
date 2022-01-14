import { Component } from '@angular/core';
import {
  doc,
  docData,
  Firestore
} from '@angular/fire/firestore';
import { traceUntilFirst } from '@angular/fire/performance';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Product } from 'projects/price-compare-app/src/app/shared/models/product';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent {
  product$?: Observable<Product | undefined>;
  constructor(private route: ActivatedRoute, private firestore: Firestore) {
    this.route.paramMap.subscribe((params: ParamMap) => {
      const id = params.get('id');
      const productRef = doc(this.firestore, `products/${id}`);
      this.product$ = docData(productRef, { idField: 'id' }).pipe(
        traceUntilFirst('firestore')
      );
    });
  }
}
