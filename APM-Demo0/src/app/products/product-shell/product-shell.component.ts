import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Product } from '../product';
import { ProductPageActions, ProductApiActions} from '../state/actions';
import { getCurrentProduct, getError, getProducts, getShowProductCode, State } from '../state';

@Component({
  templateUrl: './product-shell.component.html',
})
export class ProductShellComponent implements OnInit {

  products$: Observable<Product[]>;
  selectedProduct$: Observable<Product>;
  displayCode$: any;
  errorMessage$: Observable<string>;

  constructor(private store: Store<State>) { }

  ngOnInit(): void {
    this.store.dispatch(ProductPageActions.loadProducts());
    this.products$ = this.store.select(getProducts);
    this.selectedProduct$ = this.store.select(getCurrentProduct);
    this.displayCode$ =this.store.select(getShowProductCode);
    this.errorMessage$ = this.store.select(getError)
  }

  checkChanged(): void {
    this.store.dispatch( ProductPageActions.toggleProductCode());
  }

  newProduct(): void {
    this.store.dispatch( ProductPageActions.initializeCurrentProduct() );
  }

  productSelected(product: Product): void {
    this.store.dispatch( ProductPageActions.setCurrentProduct({ currentProductId: product.id }));
  }
}
