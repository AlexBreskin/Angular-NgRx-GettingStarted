import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Product } from '../product';
import * as ProductActions from '../state/product.actions';
import { getCurrentProduct, getError, getProducts, getShowProductCode, State } from '../state/product.reducer';

@Component({
  selector: 'pm-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  pageTitle = 'Products';

  products$: Observable<Product[]>;
  selectedProduct$: Observable<Product>;
  displayCode$: any;
  errorMessage$: Observable<string>;

  constructor(private store: Store<State>) { }

  ngOnInit(): void {
    // TODO: Unsubscribe
    this.selectedProduct$ = this.store.select(getCurrentProduct);

    this.products$ = this.store.select(getProducts);

    this.store.dispatch(ProductActions.loadProducts());

    this.displayCode$ =this.store.select(getShowProductCode);

    this.errorMessage$ = this.store.select(getError)
  }

  checkChanged(): void {
    this.store.dispatch( ProductActions.toggleProductCode());
  }

  newProduct(): void {
    this.store.dispatch( ProductActions.initializeCurrentProduct() );
  }

  productSelected(product: Product): void {
    this.store.dispatch( ProductActions.setCurrentProduct({ currentProductId: product.id }));
  }

}
