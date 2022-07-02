import {USER_ACTION_TYPES} from "./user.types";

const INITIAL_STATE = {
    currentUser: null,
    currentUserDoc: null
}

export const userReducer = (state = INITIAL_STATE, action) => {
    const { type, payload } = action;

    switch (type) {
        case USER_ACTION_TYPES.SET_CURRENT_USER: {
            const {currentUser, currentUserDoc} = payload;
            return {
                ...state,
                currentUser,
                currentUserDoc,
            }
        }

        case USER_ACTION_TYPES.SET_CURRENT_USER_DOC: {
            const {currentUserDoc} = payload;
            return {
                ...state,
                currentUserDoc,
            }
        }

        case USER_ACTION_TYPES.LOGOUT_USER: {
            return {
                ...state,
                currentUser: null,
                currentUserDoc: null
            }
        }

        default:
            return state;
    }
}
