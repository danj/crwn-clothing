import {getOrCreateUserDocumentFromAuth} from "../../utils/firebase/firebase.utils";
import {createAction} from "../../utils/reducer/reducer.utils";
import {USER_ACTION_TYPES} from "../user/user.types";

export const CATEGORIES_ACTION_TYPES = {
    SET_CATEGORIES: 'CATEGORIES_ACTION_TYPES_SET_CATEGORIES',
}

const INITIAL_STATE = {
    categories: []
}

export const categoriesReducer = (state = INITIAL_STATE, action) => {
    const { type, payload } = action;

    switch (type) {
        case CATEGORIES_ACTION_TYPES.SET_CATEGORIES: {
            const categories = payload;
            return {
                ...state,
                categories
            }
        }

        default:
            return state;
    }
}

export const setCategories = (categories) => {
    return createAction(CATEGORIES_ACTION_TYPES.SET_CATEGORIES, categories);
}

export const categoriesMapSelector = (state) => state.categories.categories.reduce((acc, data) => {
    const {title, items} = data;
    acc[title.toLowerCase()] = items;
    return acc;
}, {});

export const categoriesSelector = (state) => state.categories.categories;
