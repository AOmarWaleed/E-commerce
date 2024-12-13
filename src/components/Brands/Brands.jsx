// import Style from './Brands.module.css';

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Loading from "../Loading/Loading";
import { useState } from "react";
import { FaTimes } from "react-icons/fa";

export default function Brands() {
  const [viewModal, setViewModal] = useState(false);
  const [modalValues, setModalValues] = useState({
    name: "",
    image: "",
  });

  const {
    data: brands,
    error,
    isError,
    isLoading,
  } = useQuery({
    queryKey: ["brands"],
    queryFn: () => axios.get(`${import.meta.env.VITE_BASE_URL}/brands`),
    select: (data) => data.data.data,
  });

  if (isLoading) return <Loading />;
  if (isError) return <p>{JSON.stringify(error)}</p>;

  function showModal(name, image) {
    setModalValues({ name, image });
    setViewModal(true);
  }

  return (
    <>
      <h2 className="text-center mb-6">Brands</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        {brands?.map((brand) => (
          <button
            key={brand?._id}
            onClick={() => showModal(brand?.name, brand?.image)}
          >
            <div className="border rounded hover:shadow-md hover:shadow-green-400 transition-all duration-300">
              <div className="brandImg">
                <img
                  src={brand?.image}
                  alt=""
                  className="w-full block   object-cover object-top"
                />
              </div>
              <div className="brandName text-center p-6 text-2xl text-green-500 font-bold">
                {brand?.name}
              </div>
            </div>
          </button>
        ))}
      </div>
      {viewModal && (
        <>
          <div className="fixed inset-0 bg-slate-500 bg-opacity-50 flex justify-center items-center">
            <div className="bg-white w-1/2 h-1/2 flex p-6 justify-between items-center rounded-xl relative">
            <FaTimes className="text-3xl text-red-500 cursor-pointer absolute end-2 top-2" onClick={() => setViewModal(false)}/>
            <h3 className="text-green-400 font-medium">{modalValues.name}</h3>
            <img src={modalValues.image} alt="" />
            </div>
          </div>
        </>
      )}
    </>
  );
}
