import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  AngularFirestore,
  DocumentReference,
  QuerySnapshot
} from '@angular/fire/firestore';
import {
  Cart,
  CART_STATUS,
  Product,
  Purchase
} from '@modules/product/models/product.model';
import { getUniqueId } from '@core/helpers/app.helper';
import { map, take } from 'rxjs/operators';

@Injectable()
export class ProductService {
  constructor(private _firestore: AngularFirestore) {}

  public fetchProducts$(): Observable<Product[]> {
    return this._firestore.collection<Product>('products').valueChanges();
  }

  public fetchPendingCart$(): Observable<Cart[]> {
    return this._firestore
      .collection<Cart>('carts', (collection) =>
        collection.where('status', '==', CART_STATUS.PENDING)
      )
      .valueChanges();
  }

  public fetchPurchase$(cart: Cart): Observable<QuerySnapshot<Purchase>> {
    return this._firestore
      .collection<Purchase>('product_carts', (collection) =>
        collection.where('cart_id', '==', cart.id)
      )
      .get();
  }

  public createCart(): Promise<DocumentReference<Cart>> {
    return this._firestore.collection<Cart>('carts').add({
      id: getUniqueId().toString(),
      status: CART_STATUS.PENDING
    });
  }

  public addToCart(
    cart: Cart,
    productId: string,
    quantity: number
  ): Promise<void> {
    return this._firestore
      .collection('product_carts')
      .doc(`${cart.id}_${productId}`)
      .set({
        cart_id: cart.id,
        product_id: productId,
        quantity
      });
  }

  public updateProductInCart(
    cart: Cart,
    productId: string,
    quantity: number
  ): Promise<void> {
    return this._firestore
      .collection('product_carts')
      .doc(`${cart.id}_${productId}`)
      .update({ quantity });
  }

  public deleteFromCart(cart: Cart, productId: string): Promise<void> {
    return this._firestore
      .collection('product_carts')
      .doc(`${cart.id}_${productId}`)
      .delete();
  }

  public getPendingCartDocumentId(cart: Cart): Observable<{ id: string }[]> {
    return this._firestore
      .collection<Cart>('carts')
      .snapshotChanges()
      .pipe(
        map((actions) =>
          actions
            .map((action) => {
              const data = action.payload.doc.data() as Cart;
              const id = action.payload.doc.id;
              return data.id === cart.id ? { id } : { id: '' };
            })
            .filter((action) => !!action.id)
        )
      );
  }

  public completeOrder(cart: Cart): Promise<void> {
    return new Promise((resolve, reject) => {
      this.getPendingCartDocumentId(cart)
        .pipe(take(1))
        .subscribe((snapshot) => {
          if (snapshot.length === 0) {
            reject();
          }

          this._firestore
            .collection<Cart>('carts')
            .doc(snapshot[0].id)
            .update({ status: CART_STATUS.COMPLETED })
            .then(() => {
              resolve();
            });
        });
    });
  }
}
