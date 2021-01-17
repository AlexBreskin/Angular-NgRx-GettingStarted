import { createAction, createFeatureSelector, createReducer, createSelector, on } from "@ngrx/store";
import * as AppState from '../../state/app.state'

export interface State extends AppState.State {
    user: UserState;
}

export interface UserState {
    maskUserName: boolean;
}

const initialState: UserState = {
    maskUserName: false
}

const getUserFeatureState = createFeatureSelector<UserState>('user');

export const getMaskUserName = createSelector(
    getUserFeatureState,
    state => state.maskUserName
);

export const userReducer = createReducer<UserState>(
    initialState,
    on(createAction('[User] Mask User Name'), (state: UserState) => {
        return {
            ...state,
            maskUserName: !state.maskUserName
        }
    })
);