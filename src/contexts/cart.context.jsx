import {createContext, useEffect, useState} from "react";

const _addItemToCart = (cartItems, productToAdd) => {
    const existingCartItem = cartItems.find((item) => item.id === productToAdd.id);

    if (existingCartItem) {
        return cartItems.map((item) => item.id === productToAdd.id
            ? { ...item, quantity: item.quantity + 1 }
            : item)
    } else {
        return [...cartItems, { ...productToAdd, quantity: 1}];
    }
}

const _decItemFromCart = (cartItems, productToDecrease) => {
    const existingCartItem = cartItems.find((item) => item.id === productToDecrease.id);

    if (!existingCartItem) {
        return cartItems;
    } else {
        return cartItems.map((item) => item.id === productToDecrease.id
            ? { ...item, quantity: item.quantity - 1 } : item)
            .filter((item) => item.quantity > 0);
    }
}

const _removeItemFromCart = (cartItems, productToRemove) => {
    return cartItems.filter((item) => item.id !== productToRemove.id);
}

export const CartContext = createContext({
    isCartOpen: false,
    setCartOpen: (value) => null,
    items: [],
    addItemToCart: (productToAdd) => null,
    decreaseItemQuantity: (productToRemove) => null,
    removeItemFromCart: (productToRemove) => null,
    itemCount: 0,
    total: 0,
});
//
// const INITIAL_STATE = {
//     isCartOpen: false,
//     items: [],
//     itemCount: 0,
//     total: 0
// };
//
// const CART_ACTIONS = {
//     OPEN: 'OPEN',
//     CLOSE: 'CLOSE',
//     TOGGLE: 'TOGGLE',
//     RESET: 'RESET',
//     ADD_ITEM: 'ADD_ITEM',
//     REMOVE_ITEM: 'REMOVE_ITEM'
// }
//
// const CartReducder = (state, action) => {
//     const { type, payload } = action;
//     switch (type) {
//         case 'OPEN':
//             return {...state, isCartOpen: true}
//
//         case 'CLOSE':
//             return {...state, isCartOpen: false}
//
//         case 'TOGGLE':
//             const { isCartOpen } = state;
//             return {...state, isCartOpen: !isCartOpen}
//
//         case 'RESET':
//             return INITIAL_STATE;
//
//         case 'ADD_ITEM': {
//             const {items} = state;
//             const {item} = payload;
//
//             let found = false;
//             const newItems = items.map((item_) => {
//                 if (item_.id === item.id) {
//                     found = true;
//                     return {...item_, quantity: item_.quantity + item.quantity}
//                 } else {
//                     return _item;
//                 }
//             });
//             if (!found) {
//                 newItems.append(item);
//             }
//             return {
//                 ...state,
//                 items: newItems,
//                 itemCount: state.itemCount + item.quantity,
//                 total: state.total + item.price * item.quantity
//             }
//         }
//
//         case 'REMOVE_ITEM': {
//             const {items} = state;
//             const {item} = payload;
//
//             const newItems = items.filter((item_) => item_.id != item.id);
//
//             return {
//                 ...state,
//                 items: newItems,
//                 itemCount: state.itemCount + item.quantity,
//                 total: state.total + item.price * item.quantity
//             }
//         }
//
//         default:
//             throw Error(`Unexpected action type: ${type}`);
//     }
// }


export const CartProvider = ({ children }) => {
    const [isCartOpen, setCartOpen] = useState(false);
    const [items, setItems] = useState([]);
    const [itemCount, setItemCount] = useState(items.length);
    const [total, setTotal] = useState(0);

    const addItemToCart = (productToAdd) => {
        setItems(_addItemToCart(items, productToAdd));
    }

    const decreaseItemQuantity = (productToRemove) => {
        setItems(_decItemFromCart(items, productToRemove));
    }

    const removeItemFromCart = (productToRemove) => {
        setItems(_removeItemFromCart(items, productToRemove));
    }

    const value = {
        isCartOpen, setCartOpen, items,
        addItemToCart, decreaseItemQuantity, removeItemFromCart,
        itemCount, total
    };

    useEffect(() => {
        setItemCount(items.reduce((sum, item) => sum + item.quantity, 0))
    }, [items]);

    useEffect(() => {
        setTotal(items.reduce((sum, item) => sum + item.quantity * item.price, 0))
    }, [items]);

    return (
        <CartContext.Provider value={value}>{children}</CartContext.Provider>
    );
}
