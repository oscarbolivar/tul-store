import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { Product } from '@modules/product/models/product.model';

@Injectable()
export class ProductService {
  constructor(private _firestore: AngularFirestore) {}

  public fetchProducts$(): Observable<Product[]> {
    return this._firestore.collection<Product>('products').valueChanges();
  }
}
