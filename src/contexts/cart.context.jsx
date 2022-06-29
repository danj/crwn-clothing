import {createContext, useState} from "react";

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
});

export const CartProvider = ({ children }) => {
    const [isCartOpen, setCartOpen] = useState(false);
    const [items, setItems] = useState([]);

    const addItemToCart = (productToAdd) => {
        setItems(_addItemToCart(items, productToAdd));
    }

    const value = { isCartOpen, setCartOpen, items, addItemToCart };

    // useEffect(() => {
    // }, []);

    return (
        <CartContext.Provider value={value}>{children}</CartContext.Provider>
    );
}
