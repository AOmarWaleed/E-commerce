// import Style from './Categories.module.css';

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Loading from "../Loading/Loading";
import { useState } from "react";

export default function Categories() {
  const [subs, setSubs] = useState([]);

  const {
    data: categories,
    error,
    isError,
    isLoading,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: () => axios.get(`${import.meta.env.VITE_BASE_URL}/categories`),
    select: (data) => data.data.data,
  });

  if (isLoading) return <Loading />;
  if (isError) return <p>{JSON.stringify(error)}</p>;
  // console.log(categories);

  function getSubCategories(id) {
    axios
      .get(`${import.meta.env.VITE_BASE_URL}/categories/${id}/subcategories`)
      .then((data) => setSubs(data.data.data))
      .catch((error) => console.log(error));
  }

  return (
    <>
      <h2 className="text-center mb-6">Categories</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        {categories?.map((category) => (
          <button
            key={category?._id}
            onClick={() => getSubCategories(category?._id)}
          >
            <div className="border rounded hover:shadow-md hover:shadow-green-400 transition-all duration-300">
              <div className="categoryImg">
                <img
                  src={category?.image}
                  alt=""
                  className="w-full block size-80  object-cover object-top"
                />
              </div>
              <div className="categoryName text-center p-6 text-2xl text-green-500 font-bold">
                {category?.name}
              </div>
            </div>
          </button>
        ))}
      </div>
      {subs?.length > 0 && (
        <>
          <h3 className="text-center mb-4 font-medium ">Sub Categories</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            {subs?.map((subcategory) => (
              <div
                key={subcategory?._id}
                className="border rounded hover:shadow-md hover:shadow-green-400 transition-all duration-300 flex items-center justify-center"
              >
                <div className=" text-center p-6 text-2xl text-green-500 font-bold">
                  {subcategory?.name}
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </>
  );
}
