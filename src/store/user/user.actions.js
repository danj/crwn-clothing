import {getOrCreateUserDocumentFromAuth} from "../../utils/firebase/firebase.utils";
import {USER_ACTION_TYPES} from "./user.types";
import {createAction} from "../../utils/reducer/reducer.utils";

export const setCurrentUser = async (user) => {
    if (user) {
        const userDoc = await getOrCreateUserDocumentFromAuth(user);
        return createAction(USER_ACTION_TYPES.SET_CURRENT_USER, {currentUser: user, currentUserDoc: userDoc });
    } else {
        return createAction(USER_ACTION_TYPES.LOGOUT_USER);
    }
}

export const setCurrentUserDoc = (userDoc) =>
    createAction(USER_ACTION_TYPES.SET_CURRENT_USER_DOC, {currentUserDoc: userDoc });


export const logoutUser = () => createAction(USER_ACTION_TYPES.LOGOUT_USER);
