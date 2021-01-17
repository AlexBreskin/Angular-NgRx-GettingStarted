import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { mergeMap, map, catchError, concatMap } from 'rxjs/operators';
import { ProductService } from '../product.service';
import { ProductApiActions, ProductPageActions}  from './actions';

@Injectable()
export class ProductEffects {

    constructor(private actions$: Actions, private productService: ProductService) { }

    loadProducts$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(ProductPageActions.loadProducts),
            mergeMap(() => this.productService.getProducts().pipe(
                map(products => ProductApiActions.loadProductsSuccess({ products })),
                catchError(error => of(ProductApiActions.loadProductsFailure({error})))
            )),
        )
    });

    updateProduct$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(ProductPageActions.updateProduct),
            concatMap( action => 
                this.productService.updateProduct(action.product)
                .pipe(
                    map(product => ProductApiActions.updateProductSuccess({ product })),
                    catchError(error => of(ProductApiActions.updateProductFailure({ error })))
                )
            )
        )
    });
    
    addProduct$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(ProductPageActions.createProduct),
            concatMap( action => 
                this.productService.createProduct(action.product)
                .pipe(
                    map(product => ProductApiActions.createProductSuccess({ product })),
                    catchError(error => of(ProductApiActions.createProductFailure({ error })))
                )
            )
        )
    });
    
    deleteProduct$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(ProductPageActions.deleteProduct),
            mergeMap( action => 
                this.productService.deleteProduct(action.product.id)
                .pipe(
                    map(productId => ProductApiActions.deleteProductSuccess({ productId })),
                    catchError(error => of(ProductApiActions.deleteProductFailure({ error })))
                )
            )
        )
    });
}