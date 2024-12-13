// import Style from './ButtonAddToWishList.module.css';

import { useContext, useEffect, useState } from "react";
import { FaHeart, FaSpinner } from "react-icons/fa";
import { WishlistContext } from "../../context/WishlistContext";
import toast from "react-hot-toast";

// eslint-disable-next-line react/prop-types
export default function ButtonAddToWishList({ productID }) {
  const { wishlistIDs, addProductToWishlist, removeProductFromWishlist } =
    useContext(WishlistContext);
  const [redColor, setRedColor] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    wishlistIDs?.includes(productID) ? setRedColor(true) : setRedColor(false);
  }, [wishlistIDs, productID]);

  function handleHeartClick(productID) {
    if (redColor) {
      removeFromWishlist(productID);
    } else {
      addToWishlist(productID);
    }
  }

  async function removeFromWishlist(productID) {
    toast.promise(removeProductFromWishlist(productID), {
      loading: () => {
        setLoading(true);
        return "Loading";
      },
      success: (data) => {
        console.log(data);
        setLoading(false);
        return "Removed!";
      },
      error: () => {
        setLoading(false);
        return "Something went wrong!";
      },
    });
  }

  async function addToWishlist(productID) {
    toast.promise(addProductToWishlist(productID), {
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
    <button onClick={() => handleHeartClick(productID)} className="relative">
      {loading ? (
        <FaSpinner className="animate-spin mx-auto text-2xl" />
      ) : (
        <FaHeart
          className={`text-2xl ${redColor ? "text-red-600" : "text-gray-300"}`}
        />
      )}
    </button>
  );
}
