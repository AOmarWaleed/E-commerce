// import Style from './Products.module.css';

import axios from "axios";
import { FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Loading from "../Loading/Loading";
import ButtonAddToCart from "../ButtonAddToCart/ButtonAddToCart";
import ButtonAddToWishList from "../ButtonAddToWishList/ButtonAddToWishList";
import { useEffect, useState } from "react";
import SearchInput from "../SearchInput/SearchInput";

export default function Products() {
  const [displayedProducts, setDisplayedProducts] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const {
    data: products,
    error,
    isError,
    isLoading,
  } = useQuery({
    queryKey: ["products"],
    queryFn: () => axios.get(`${import.meta.env.VITE_BASE_URL}/products`),
    select: (data) => data.data.data,
    staleTime: 10 * 1000,
  });

  useEffect(() => {
    setDisplayedProducts(products);
  }, [products]);

  const handleSearchInputChange = (e) => {
    setSearchInput(e.target.value);
  };

  const filteredProducts = displayedProducts?.filter((product) => {
    return (
      product.title.toLowerCase().includes(searchInput.toLowerCase()) ||
      product.description.toLowerCase().includes(searchInput.toLowerCase())
    );
  });

  if (isLoading) return <Loading />;

  if (isError) return <p>{JSON.stringify(error)}</p>;

  return (
    <>
      <SearchInput
        onChangeFunction={handleSearchInputChange}
        value={searchInput}
        setValue={setSearchInput}
      />
      <div className="grid gap-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 py-4">
        {filteredProducts?.map((product) => (
          <div
            key={product?.id}
            className="group hover:shadow-lg dark:hover:shadow-green-400 dark:hover:shadow  p-2 rounded-xl overflow-hidden"
          >
            <Link to={`productDetails/${product?.id}`}>
              <div className="">
                <img
                  src={product?.imageCover}
                  alt={product?.title}
                  className="w-full rounded-xl"
                />
                <h6 className="text-green-400">{product?.category.name}</h6>
                <h3 className="truncate" title={product?.title}>
                  {product?.title}
                </h3>
                <p className="line-clamp-2" title={product?.description}>
                  {product?.description}
                </p>
                <div className="flex justify-between">
                  <div className="font-semibold">{product?.price} EGP</div>
                  <div className="flex gap-1 items-center">
                    {product?.ratingsAverage}
                    <FaStar className="text-yellow-400" />
                  </div>
                </div>
              </div>
            </Link>

            <div className="flex gap-2">
              <ButtonAddToCart
                productID={product?.id}
                style={
                  "w-full mt-2 md:translate-y-full group-hover:translate-y-0 transition-all duration-500 md:opacity-0 group-hover:opacity-100"
                }
              />
              <ButtonAddToWishList productID={product?.id} />
            </div>
          </div>
        ))}
      </div>
    </>
  );
}




