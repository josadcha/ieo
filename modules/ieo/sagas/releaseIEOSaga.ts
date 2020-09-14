import { call, put } from 'redux-saga/effects';
import { API } from '../../../../../api';
import { applogicRequestOptions, getCsrfToken } from '../../../../../helpers';
import { alertPush } from '../../../../../modules';
import {
    releaseIEOData,
    releaseIEOError,
    ReleaseIEOFetch,
} from '../actions';

export function* releaseIEOSaga(action: ReleaseIEOFetch) {
    try {
        const { id, release_fund } = action.payload;
        yield call(API.put(applogicRequestOptions(getCsrfToken())), `/admin/ieo/sales/release_fund/${id}`, { release_fund });

        yield put(releaseIEOData());
        yield put(alertPush({message: [`IEO successfully released`], type: 'success'}));
    } catch (error) {
        yield put(releaseIEOError());
        yield put(alertPush({message: error.message, code: error.code, type: 'error'}));
    }
}
