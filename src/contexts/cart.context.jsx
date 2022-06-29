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
            ? { ...item, quantity: item.quantity - 1 }
            : item)
            .filter((item) => item.quantity > 0);
    }
}

const _removeItemFromCart = (cartItems, productToRemove) => {
    return cartItems.filter((item) => item.id != productToRemove.id);
}

export const CartContext = createContext({
    isCartOpen: false,
    setCartOpen: (value) => null,
    items: [],
    addItemToCart: (productToAdd) => null,
    decreaseItemQuantity: (productToRemove) => null,
    removeItemFromCart: (productToRemove) => null,
    itemCount: 0,
});

export const CartProvider = ({ children }) => {
    const [isCartOpen, setCartOpen] = useState(false);
    const [items, setItems] = useState([]);
    const [itemCount, setItemCount] = useState(items.length);

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
        itemCount
    };

    useEffect(() => {
        setItemCount(items.reduce((sum, item) => sum + item.quantity, 0))
    }, [items]);

    return (
        <CartContext.Provider value={value}>{children}</CartContext.Provider>
    );
}
