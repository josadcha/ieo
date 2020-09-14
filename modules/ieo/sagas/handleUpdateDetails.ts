import { push } from 'react-router-redux';
import { call, put } from 'redux-saga/effects';
import { API } from '../../../../../api';
import { applogicRequestOptions, getCsrfToken } from '../../../../../helpers';
import { alertPush } from '../../../../../modules';
import {
    updateDetailsIEOData,
    updateDetailsIEOError,
    UpdateDetailsIEOFetch,
} from '../actions';

export function* updateDetailsIEOSaga(action: UpdateDetailsIEOFetch) {
    try {
        const { data } = yield call(API.put(applogicRequestOptions(getCsrfToken())), `/admin/metadata/${action.payload.id}`, {
            key: action.payload.id,
            value: action.payload.value,
        });
        yield put(updateDetailsIEOData(data.value));
        yield put(alertPush({ message: [`IEO successfully updated`], type: 'success' }));
        yield put(push(`/tower/plugins/ieo`));
    } catch (error) {
        yield put(updateDetailsIEOError());
        yield put(alertPush({message: error.message, code: error.code, type: 'error'}));
    }
}
