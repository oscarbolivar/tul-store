import { Component, OnInit } from '@angular/core';
import { ProductFacade } from '@modules/product/facade/product.facade';
import { Product } from '@modules/product/models/product.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.sass']
})
export class StoreComponent implements OnInit {
  constructor(private _facade: ProductFacade) {}

  ngOnInit(): void {
    this._facade.fetchProducts();
  }

  get products$(): Observable<Product[]> {
    return this._facade.products$;
  }
}
