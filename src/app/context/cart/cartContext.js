"use client";
import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartData, setCartData] = useState([]);

  useEffect(() => {
    setCartData(JSON.parse(localStorage.getItem("cartData")));
  }, []);

  return (
    <CartContext.Provider value={{ cartData, setCartData }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
