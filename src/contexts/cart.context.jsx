import {createContext, useState} from "react";

export const CartContext = createContext({
    isCartOpen: false,
    setCartOpen: (value) => null,
    items: [],
    setItems: (items) => null
});

export const CartProvider = ({ children }) => {
    const [isCartOpen, setCartOpen] = useState(false);
    const [items, setItems] = useState([]);

    const value = { isCartOpen, setCartOpen, items, setItems };

    // useEffect(() => {
    // }, []);

    return (
        <CartContext.Provider value={value}>{children}</CartContext.Provider>
    );
}
