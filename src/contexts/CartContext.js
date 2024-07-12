import { createContext, useState } from "react";

const CartContext = createContext(null);

export const CartProvider = ({ children }) => {

    const [cart, setCart] = useState([])
    const [orders, setOrders] = useState([])
    
    const values = { cart, setCart, orders, setOrders }
    return <CartContext.Provider value={values}>{children}</CartContext.Provider>
}

export default CartContext;