import { createAction, createReducer, on } from "@ngrx/store";
import { Product } from "../product";
import { ProductData } from "../product-data";
import * as AppState from '../../state/app.state'

export interface State extends AppState.State {
    products: ProductState;
}

export interface ProductState {
    showProductCode: boolean;
    currentProduct: ProductData;
    products: Product[];
}

const initialState: ProductState = {
    showProductCode: true,
    currentProduct: null,
    products: []
}

export const productReducer = createReducer<ProductState>(
    initialState,
    on(createAction('[Product] Toggle Product Code'), (state: ProductState) => {
        return {
            ...state,
            showProductCode: !state.showProductCode
        }
    })
);