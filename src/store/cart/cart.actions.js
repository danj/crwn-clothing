import {createAction} from "../../utils/reducer/reducer.utils";
import {CARTS_ACTION_TYPES as CART_ACTION_TYPES} from "./cart.types";

export const openCart = () => createAction(CART_ACTION_TYPES.OPEN);
export const closeCart = () => createAction(CART_ACTION_TYPES.CLOSE);
export const toggleCartOpen = () => createAction(CART_ACTION_TYPES.TOGGLE);

export const addItemToCart = (item) => createAction(CART_ACTION_TYPES.ADD_ITEM, item);
export const removeItemFromCart = (item) => createAction(CART_ACTION_TYPES.REMOVE_ITEM, item);
export const decreaseItemQuantity = (item) => createAction(CART_ACTION_TYPES.DECREMENT_ITEM_QUANTITY, item);
