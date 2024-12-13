// import Style from './Wishlist.module.css';

import { useContext, useEffect, useState } from "react";
import { WishlistContext } from "../../context/WishlistContext";
import ButtonAddToCart from "../ButtonAddToCart/ButtonAddToCart";
import { FaTrash } from "react-icons/fa";
import Loading from "../Loading/Loading";

export default function Wishlist() {
  const { wishlistProducts, removeProductFromWishlist, isFetching } =
    useContext(WishlistContext);
  const [products, setProducts] = useState([]);
  console.log(isFetching);

  useEffect(() => {
    setProducts(wishlistProducts);
  }, [wishlistProducts]);

  function handleRemoveFromWishlist(productID) {
    removeProductFromWishlist(productID);
  }

  if (isFetching)
    return (
      <>
        <h2 className="text-center">Wishlist</h2>
        <Loading />
      </>
    );

  if (!products?.length)
    
    return (
      <div className="text-center text-3xl my-20 font-sans">
        <h2>Wishlist</h2>
        <br />
        <p>Your Wishlist is empty!</p>
      </div>
    );

  return (
    <>
      <h2 className="text-center">Wishlist</h2>
      {products?.map((product) => (
        <div
          key={product.id}
          className=" flex flex-col md:flex-row justify-between items-center border-b-[1px] border-gray-300 py-16"
        >
          <div className="productDetails flex flex-col md:flex-row items-center gap-8">
            <div className="max-w-48">
              <img src={product.imageCover} className="w-full block" />
            </div>
            <div>
              <h3>{product.title}</h3>
              <p className="my-2">{product.price} EGP</p>
              <button
                className="flex items-center gap-1 text-red-600 mt-4 "
                onClick={() => handleRemoveFromWishlist(product.id)}
              >
                <FaTrash /> Remove
              </button>
            </div>
          </div>
          <div
            onClick={() => handleRemoveFromWishlist(product.id)}
            className="min-w-[115px] mt-6"
          >
            <ButtonAddToCart productID={product.id} />
          </div>
        </div>
      ))}
    </>
  );
}
