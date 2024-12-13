// import Style from './ButtonAddToCart.module.css';

import { useContext, useState } from "react";
import { CartContext } from "../../context/CartContext";
import toast from "react-hot-toast";
import { FaSpinner } from "react-icons/fa";

export default function ButtonAddToCart({ style = "", productID }) {
  const { addProductToCart } = useContext(CartContext);
  const [loading, setLoading] = useState(false);

  async function addToCart(productID) {
    toast.promise(addProductToCart(productID), {
      loading: () => {
        setLoading(true);
        return "Loading";
      },
      success: (data) => {
        setLoading(false);
        console.log(data);
        if (data === "You are not logged in. Please login to get access") {
          throw new Error("You are not logged in. Please login to get access");
        }
        return "Added!";
      },
      error: (error) => {
        setLoading(false);
        if (
          error.message === "You are not logged in. Please login to get access"
        ) {
          return error.message;
        }
        return "Something went wrong!";
      },
    });
  }

  return (
    <button
      className={`bg-green-400 text-white px-4 py-2 rounded-lg ${style}`}
      onClick={() => addToCart(productID)}
      disabled={loading}
    >
      {loading ? <FaSpinner className="animate-spin mx-auto" /> : "Add to cart"}
    </button>
  );
}
