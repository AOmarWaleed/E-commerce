// import Style from './CategorySlider.module.css';

import axios from "axios";
import Slider from "react-slick";
import Loading from "../Loading/Loading";
import { useQuery } from "@tanstack/react-query";

export default function CategorySlider() {
  const {
    data: categories,
    error,
    isError,
    isLoading,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: () => axios.get(`${import.meta.env.VITE_BASE_URL}/categories`),
    select: (data) => data.data.data,
    staleTime: 10 * 1000,
  });

  if (isLoading) return <Loading />;

  if (isError) return <p>{error}</p>;

  const settings = {
    arrows:true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 4,
    infinite: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <>
      <p>{error}</p>
      <div className="slider-container px-4  mb-4">
        <Slider {...settings}>
          {categories.map((category) => (
            <div key={category?._id} className="text-center p-2">
              <div className="inner">
                <img
                  src={category?.image}
                  alt=""
                  className="w-full h-36 object-cover object-center"
                />
                <p>{category?.name}</p>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </>
  );
}
