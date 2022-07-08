import {getCategoriesAndDocuments} from "../../utils/firebase/firebase.utils";
import {fetchCategoriesFailed, fetchCategoriesStart, fetchCategoriesSuccess} from "./categories.actions";
import { takeLatest, all, call, put } from 'redux-saga/effects';
import {CATEGORIES_ACTION_TYPES} from "./categories.types";

export function* fetchCategoriesAsync() {
    try {
        const categories = yield call(getCategoriesAndDocuments);
        yield put(fetchCategoriesSuccess(categories));
    }
    catch (error) {
        yield put(fetchCategoriesFailed(error));
    }
}

export function*  onFetchCategories() {
    yield takeLatest(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START, fetchCategoriesAsync)
}

export function* categoriesSaga() {
    yield all([call(onFetchCategories)]);
}
