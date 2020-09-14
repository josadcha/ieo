
import { combineReducers } from 'redux';
import { all, call } from 'redux-saga/effects';
import { ieoReducer, rootIEOSaga, StateIEO } from './ieo';

export * from './ieo';

export interface IeoPluginState {
    ieoPlugin: StateIEO;
}

export const ieoPluginReducer = combineReducers({
    ieoPlugin: ieoReducer,
});

export function* rootIeoPluginSaga() {
    yield all([
        call(rootIEOSaga),
    ]);
}
