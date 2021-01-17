import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Product } from '../product';
import { ProductPageActions } from '../state/actions';
import { getCurrentProduct, getError, getProducts, getShowProductCode, State } from '../state';

@Component({
  templateUrl: './product-shell.component.html',
})
export class ProductShellComponent implements OnInit {

  products$: Observable<Product[]>;
  selectedProduct$: Observable<Product>;
  displayCode$: Observable<boolean>;
  errorMessage$: Observable<string>;

  constructor(private store: Store<State>) { }

  ngOnInit(): void {
    this.products$ = this.store.select(getProducts);
    this.errorMessage$ = this.store.select(getError);
    this.store.dispatch(ProductPageActions.loadProducts());
    this.selectedProduct$ = this.store.select(getCurrentProduct);
    this.displayCode$ =this.store.select(getShowProductCode);
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

  clearCurrent(): void {
    this.store.dispatch(ProductPageActions.clearCurrentProduct());
  }

  deleteProduct(product: Product): void {
    this.store.dispatch(ProductPageActions.deleteProduct({ product }))
  }

  updateProduct(product: Product): void {
    this.store.dispatch(ProductPageActions.updateProduct({ product }))
  }

  createProduct(product: Product): void {
    this.store.dispatch(ProductPageActions.createProduct({ product }))
  }
}
