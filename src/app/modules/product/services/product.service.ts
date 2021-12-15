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

  public createCart(): Promise<DocumentReference<unknown>> {
    return this._firestore.collection('carts').add({
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
      .collection('product_carts', (collection) =>
        collection
          .where('cart_id', '==', cart.id)
          .where('product_id', '==', productId)
      )
      .doc(`${cart.id}_${productId}`)
      .update({ quantity });
  }

  public deleteFromCart(cart: Cart, productId: string): Promise<void> {
    return this._firestore
      .collection('product_carts')
      .doc(`${cart.id}_${productId}`)
      .delete();
  }
}
