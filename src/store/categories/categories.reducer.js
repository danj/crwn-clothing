import {getOrCreateUserDocumentFromAuth} from "../../utils/firebase/firebase.utils";
import {createAction} from "../../utils/reducer/reducer.utils";
import {USER_ACTION_TYPES} from "../user/user.types";
import {CATEGORIES_ACTION_TYPES} from "./categories.types";

const INITIAL_STATE = {
    categories: [],
    isLoading: false,
    error: null,
}

export const categoriesReducer = (state = INITIAL_STATE, action) => {
    const { type, payload } = action;

    switch (type) {
        case CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START: {
            return {
                ...state,
                isLoading: true,
                error: null,
            }
        }
        case CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS: {
            return {
                ...state,
                isLoading: false,
                categories: payload
            }
        }
        case CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_FAILED: {
            return {
                ...state,
                isLoading: false,
                error: payload
            }
        }

        default:
            return state;
    }
}
