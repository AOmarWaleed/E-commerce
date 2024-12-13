import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { UserContext } from "./UserContext";
import { useQuery, useQueryClient } from "@tanstack/react-query";

export const CartContext = createContext();

export default function CartContextProvider({ children }) {
  const queryClient = useQueryClient();

  const { token } = useContext(UserContext);
  const headers = { token };

  const [numberOfCartItems, setNumberOfCartItems] = useState(0);
  const [cartData, setCartData] = useState([]);
  const [cartID, setCartID] = useState(localStorage.getItem("cartID"));

  const { data: CartResponse, isFetching } = useQuery({
    queryKey: ["CartItems"],
    queryFn: () =>
      axios.get(`${import.meta.env.VITE_BASE_URL}/cart`, {
        headers: { token },
      }),
    select: (data) => data.data,
    enabled: !!token,
  });

  useEffect(() => {
    cartID
      ? localStorage.setItem("cartID", cartID)
      : localStorage.removeItem("cartID");
  }, [cartID]);

  useEffect(() => {
    setCartData(CartResponse?.data);
    setNumberOfCartItems(CartResponse?.numOfCartItems);
  }, [CartResponse]);

  function addProductToCart(productId) {
    return axios
      .post(`${import.meta.env.VITE_BASE_URL}/cart`, { productId }, { headers })
      .then((data) => {
        queryClient.invalidateQueries({ queryKey: ["CartItems"] });
        setCartID(data.data.cartId);
        localStorage.setItem("cartID", data.data.cartId);
        return data.data;
      })
      .catch((error) => error.response.data.message);
  }

  function clearCart() {
    return axios
      .delete(`${import.meta.env.VITE_BASE_URL}/cart`, { headers })
      .then((data) => {
        queryClient.invalidateQueries({ queryKey: ["CartItems"] });
        return data.data.data;
      })
      .catch((error) => error);
  }

  return (
    <CartContext.Provider
      value={{
        numberOfCartItems,
        addProductToCart,
        cartData,
        isFetching,
        clearCart,
        headers,
        cartID,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
