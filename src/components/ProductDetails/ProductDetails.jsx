// import Style from './ProductDetails.module.css';

import axios from "axios";
import { FaStar } from "react-icons/fa";
import { useParams } from "react-router-dom";
import Loading from "../Loading/Loading";
import { useQuery } from "@tanstack/react-query";
import ButtonAddToCart from "../ButtonAddToCart/ButtonAddToCart";
import ButtonAddToWishList from "../ButtonAddToWishList/ButtonAddToWishList";
import Slider from "react-slick";

export default function ProductDetails() {
  const { id } = useParams("id");

  const {
    data: product,
    error,
    isError,
    isLoading,
  } = useQuery({
    queryKey: ["products", id],
    queryFn: () => axios.get(`${import.meta.env.VITE_BASE_URL}/products/${id}`),
    select: (data) => data.data.data,
    enabled: !!id,
  });

  if (isLoading) return <Loading />;

  if (isError) {
    console.log(error);

    return (
      <p>
        Product id: {id}.{" "}
        <span className="text-red-600 font-semibold">Not found!</span>
      </p>
    );
  }

  const settings = {
    arrows: false,
    dots: true,
    infinite: true,
    speed: 1000,
    autoplay: true,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <>
      {/* <h2 className="text-center mb-4">ProductDetails</h2> */}

      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-3 mb-2 md:mb-0 md:col-span-1">
          <Slider {...settings}>
            {product.images.map((image, i) => (
              <img
                key={i}
                src={image}
                alt=""
                className="w-full h-full object-cover"
              />
            ))}
          </Slider>
        </div>
        <div className="self-center col-span-3 md:col-span-2 flex flex-col gap-4">
          <h4 className="text-green-400">{product?.category?.name}</h4>
          <h2>{product?.title}</h2>
          <p>{product?.description}</p>
          <div className="flex justify-between">
            <div className="">{product?.price} EGP</div>
            <div className="flex gap-1 items-center">
              {product?.ratingsAverage}
              <FaStar className="text-yellow-400" />
            </div>
          </div>
          <div className="flex gap-2">
            <ButtonAddToCart productID={product?.id} style="grow" />
            <ButtonAddToWishList productID={product?.id} />
          </div>
        </div>
      </div>
    </>
  );
}
