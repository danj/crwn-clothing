import {CARTS_ACTION_TYPES} from "./cart.types";

const INITIAL_STATE = {
    isCartOpen: false,
    items: new Map(),
    itemCount: 0,
    total: 0
}

export const cartReducer = (state = INITIAL_STATE, action) => {
    const { type, payload } = action;

    switch (type) {
        case CARTS_ACTION_TYPES.OPEN:
            return {...state, isCartOpen: true}

        case CARTS_ACTION_TYPES.CLOSE:
            return {...state, isCartOpen: false}

        case CARTS_ACTION_TYPES.TOGGLE:
            const { isCartOpen } = state;
            return {...state, isCartOpen: !isCartOpen}

        case CARTS_ACTION_TYPES.RESET:
            return INITIAL_STATE;

        case CARTS_ACTION_TYPES.ADD_ITEM: {
            const item = payload;
            const { items, itemCount, total } = state;
            const oldItem = items.get(item.id);
            items.set(item.id, {
                ...item,
                quantity: oldItem ? oldItem.quantity + 1: 1
            });
            return {
                ...state,
                items: new Map(items),
                itemCount: itemCount + 1,
                total: total + item.price,
            }
        }

        case CARTS_ACTION_TYPES.REMOVE_ITEM: {
            const item = payload;
            const { items, itemCount, total } = state;
            const oldItem = items.get(item.id);
            if (!oldItem) { // didn't exist, so nothing to remove
                return state
            } else {
                items.delete(item.id);
                return {
                    ...state,
                    items: new Map(items),
                    itemCount: itemCount - oldItem.quantity,
                    total: total - oldItem.quantity * oldItem.price
                }
            }
        }

        case CARTS_ACTION_TYPES.DECREMENT_ITEM_QUANTITY: {
            const item = payload;
            const { items, itemCount, total } = state;
            const oldItem = items.get(item.id);
            if (!oldItem) { // didn't exist, so nothing to remove
                return state
            } else {
                if (oldItem.quantity === 1) {
                    items.delete(oldItem.id);
                } else {
                    items.set(item.id, { ...oldItem, quantity: oldItem.quantity - 1})
                }
                return {
                    ...state,
                    items: new Map(items),
                    itemCount: itemCount - 1,
                    total: total - oldItem.price
                }
            }
        }

        default:
            return state;
    }
}

