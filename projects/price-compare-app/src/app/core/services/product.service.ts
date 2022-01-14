import { Injectable } from '@angular/core';

// Firestore
import {
  doc,
  Firestore,
  serverTimestamp,
  setDoc,
} from '@angular/fire/firestore';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private messageSource = new BehaviorSubject('default message');
  currentMessage = this.messageSource.asObservable();

  constructor(private firestore: Firestore) {}

  changeMessage(message: string) {
    this.messageSource.next(message);
  }
}
