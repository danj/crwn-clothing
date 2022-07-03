import { createSelector} from "reselect";

export const cartIsOpenSelector = (state) => state.cart.isCartOpen;
export const cartTotalSelector = (state) => state.cart.total;
export const cartItemCountSelector = (state) => state.cart.itemCount;

// create new array of items only if the map of items has been updated
const cartItemsMapSelector = (state) => state.cart.items;
export const cartItemsSelector = createSelector(
    [cartItemsMapSelector],
    (items) => Array.from(items.values())
);
