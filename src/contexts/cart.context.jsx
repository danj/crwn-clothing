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

export const CartContext = createContext({
    isCartOpen: false,
    setCartOpen: (value) => null,
    items: [],
    addItemToCart: (productToAdd) => null,
    itemCount: 0,
});

export const CartProvider = ({ children }) => {
    const [isCartOpen, setCartOpen] = useState(false);
    const [items, setItems] = useState([]);
    const [itemCount, setItemCount] = useState(items.length);

    const addItemToCart = (productToAdd) => {
        setItems(_addItemToCart(items, productToAdd));
    }

    const value = { isCartOpen, setCartOpen, items, addItemToCart, itemCount };

    useEffect(() => {
        setItemCount(items.reduce((sum, item) => sum + item.quantity, 0))
    }, [items]);

    return (
        <CartContext.Provider value={value}>{children}</CartContext.Provider>
    );
}
