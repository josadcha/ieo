import { push } from 'react-router-redux';
import { call, put } from 'redux-saga/effects';
import { API } from '../../../../../api';
import { applogicRequestOptions, getCsrfToken } from '../../../../../helpers';
import { alertPush } from '../../../../../modules';
import {
    addIEOData,
    addIEOError,
    AddIEOFetch,
} from '../actions';

export function* addIEOSaga(action: AddIEOFetch) {
    try {
        const { data } = yield call(API.post(applogicRequestOptions(getCsrfToken())), '/admin/ieo/sales', action.payload);

        yield put(addIEOData(data));
        yield put(alertPush({message: [`IEO successfully created`], type: 'success'}));
        yield put(push(`/tower/plugins/ieo`));
    } catch (error) {
        yield put(addIEOError());
        yield put(alertPush({message: error.message, code: error.code, type: 'error'}));
    }
}
