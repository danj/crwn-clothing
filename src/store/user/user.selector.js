export const currentUserSelector = (state) => state.user?.currentUser;
export const currentUserDocSelector = (state) => state.user?.currentUserDoc;
export const currentUserDisplayNameSelector = (state) => state.user.currentUserDoc?.data().displayName ||
    state.user.currentUser?.displayName || state.user.currentUser?.email || 'John Doe';
