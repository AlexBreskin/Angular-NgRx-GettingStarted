import { createReducer, on } from "@ngrx/store";
import { Product } from "../product";
import * as  ProductActions from "./product.actions";

const initialState: ProductState = {
    showProductCode: true,
    currentProductId: null,
    products: [],
    error: ''
}

export interface ProductState {
    showProductCode: boolean;
    currentProductId: number | null;
    products: Product[];
    error: string;
}

export const productReducer = createReducer<ProductState>(
    initialState,
    on(ProductActions.toggleProductCode, (state): ProductState => {
        return {
            ...state,
            showProductCode: !state.showProductCode
        };
    }),
    on(ProductActions.setCurrentProduct, (state, action): ProductState => {
        return {
            ...state,
            currentProductId: action.currentProductId
        };
    }),
    on(ProductActions.clearCurrentProduct, (state): ProductState => {
        return {
            ...state,
            currentProductId: null
        };
    }),
    on(ProductActions.initializeCurrentProduct, (state): ProductState => {
        return {
            ...state,
            currentProductId: 0
        };
    }),
    on(ProductActions.loadProducts, (state): ProductState => {
        return {
            ...state,
        };
    }),
    on(ProductActions.loadProductsSuccess, (state,action): ProductState => {
        return {
            ...state,
            products: action.products,
            error: ''
        }
    }),
    on(ProductActions.loadProductsFailure, (state, action): ProductState => {
        return {
            ...state,
            products: [],
            error: action.error
        }
    }),
    on(ProductActions.updateProductSuccess, (state, action): ProductState => {
        const updateProducts = state.products.map(
            item => action.product.id === item.id ? action.product : item);
        return {
            ...state,
            products: updateProducts,
            currentProductId: action.product.id,
            error: ''
        }
    }),
    on(ProductActions.updateProductFailure, (state, action): ProductState => {
        return {
            ...state,
            error: action.error
        }
    }),
    on(ProductActions.createProductSuccess, (state, action): ProductState => {
        const newProducts = state.products.concat(action.product);
        return {
            ...state,
            products: newProducts,
            currentProductId: action.product.id,
            error: ''
        }
    }),
    on(ProductActions.createProductFailure, (state, action): ProductState => {
        return {
            ...state,
            error: action.error
        }
    }),
    on(ProductActions.deleteProductSuccess, (state, action): ProductState => {
        const filteredProducts = state.products.filter(item => item.id !== action.productId );
        return {
            ...state,
            products: filteredProducts,
            currentProductId: null,
            error: ''
        }
    }),
    on(ProductActions.deleteProductFailure, (state, action): ProductState => {
        return {
            ...state,
            error: action.error
        }
    }),
);