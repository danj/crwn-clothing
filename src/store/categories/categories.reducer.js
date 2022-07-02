import {getOrCreateUserDocumentFromAuth} from "../../utils/firebase/firebase.utils";
import {createAction} from "../../utils/reducer/reducer.utils";
import {USER_ACTION_TYPES} from "../user/user.types";

export const CATEGORIES_ACTION_TYPES = {
    SET_CATEGORIES: 'CATEGORIES_ACTION_TYPES_SET_CATEGORIES',
}

const INITIAL_STATE = {
    categoriesMap: {}
}

export const categoriesReducer = (state = INITIAL_STATE, action) => {
    const { type, payload } = action;

    switch (type) {
        case CATEGORIES_ACTION_TYPES.SET_CATEGORIES: {
            const categoriesMap = payload;
            return {
                ...state,
                categoriesMap
            }
        }

        default:
            return state;
    }
}

export const setCategoriesMap = (categoriesMap) => {
    return createAction(CATEGORIES_ACTION_TYPES.SET_CATEGORIES, categoriesMap);
}

export const categoriesMapSelector = (state) => state.categories.categoriesMap;
