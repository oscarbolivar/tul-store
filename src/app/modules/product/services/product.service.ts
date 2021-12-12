import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestore, DocumentReference } from '@angular/fire/firestore';
import {
  Cart,
  CART_STATUS,
  Product
} from '@modules/product/models/product.model';
import { getUniqueId } from '@core/helpers/app.helper';

@Injectable()
export class ProductService {
  constructor(private _firestore: AngularFirestore) {}

  public fetchProducts$(): Observable<Product[]> {
    return this._firestore.collection<Product>('products').valueChanges();
  }

  public existsAPendingCart$(): Observable<Cart[] | any[]> {
    return this._firestore
      .collection('carts', (collection) =>
        collection.where('status', '==', CART_STATUS.PENDING)
      )
      .valueChanges();
  }

  public createCart(): Promise<DocumentReference<unknown>> {
    return this._firestore.collection('carts').add({
      id: getUniqueId().toString(),
      status: CART_STATUS.PENDING
    });
  }
}
