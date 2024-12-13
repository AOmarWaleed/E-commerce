import { useContext, useEffect, useState } from "react";
import { CartContext } from "../../context/CartContext";
import Loading from "../Loading/Loading";
import axios from "axios";
import { FaTimes } from "react-icons/fa";
import * as Yup from "yup";
import { useFormik } from "formik";

export default function Cart() {
  const [cartDetails, setCartDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const { cartData, isFetching, clearCart, headers, cartID } =
    useContext(CartContext);
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  useEffect(() => {
    if (cartData) {
      setCartDetails(cartData);
    }
  }, [cartData]);
  const validationSchema = Yup.object().shape({
    details: Yup.string()
      .required("Details field is required!")
      .min(3, "Minimum allowed is 3 characters.")
      .max(10, "Maximum allowed is 10 characters."),
    phone: Yup.string()
      .required("Phone field is required!")
      .matches(/^01[0125][0-9]{8}$/, "Invalid egyptian phone number!"),
    city: Yup.string()
      .required("City field is required!")
      .min(1, "Minimum allowed is 1 characters.")
      .max(30, "Maximum allowed is 30 characters."),
  });

  const initialValues = {
    details: "",
    phone: "",
    city: "",
  };

  function onSubmit(values) {
    setLoading(true);
    axios
      .post(
        `${import.meta.env.VITE_BASE_URL}/orders/checkout-session/${
          cartID || localStorage.getItem("cartID")
        }?url=https://client.yousseftawfik.com`,
        values,
        { headers }
      )
      .then(({ data }) => {
        window.location.href = data.session.url;
      })
      .catch((error) =>
        console.log("submitting error:", error.response.data.message)
      )
      .finally(() => setLoading(false));
  }

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  if (isFetching || loading) {
    return (
      <>
        <div className="text-2xl text-center">Cart</div>
        <Loading />
      </>
    );
  }

  if (!cartDetails?.products?.length) {
    return (
      <div className="text-center text-3xl my-20 font-sans">
        <h2>Cart</h2>
        <br />
        <p>Your cart is empty!</p>
      </div>
    );
  }

  function updateProductQuantity(productId, count) {
    setLoading(true);

    axios
      .put(
        `${import.meta.env.VITE_BASE_URL}/cart/${productId}`,
        { count: count },
        { headers }
      )
      .then((data) => setCartDetails(data.data.data))
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  }

  function removeItemFromCart(productId) {
    setLoading(true);
    return axios
      .delete(`${import.meta.env.VITE_BASE_URL}/cart/${productId}`, { headers })
      .then((data) => setCartDetails(data.data.data))
      .catch((error) => error)
      .finally(() => setLoading(false));
  }

  function handleCheckoutClick() {
    setShowDetailsModal(true);
  }

  return (
    <>
      <div className="text-2xl text-center">Cart</div>

      <div className=" flex flex-col md:flex-row gap-4 mb-4 justify-between items-center mb-2">
        <p className="text-xl font-semibold">
          Total Amount:{" "}
          <span className="text-green-400">
            {cartDetails?.totalCartPrice || 0} EGP
          </span>
        </p>
        <div className="flex gap-2">
          <button
            className="btn bg-green-500 hover:bg-green-600 text-white"
            onClick={handleCheckoutClick}
          >
            Checkout
          </button>
          <button
            className="btn bg-red-700 hover:bg-red-600 text-white"
            onClick={clearCart}
          >
            Clear Cart
          </button>
        </div>
      </div>

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg ">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-16 py-3">
                <span className="sr-only">Image</span>
              </th>
              <th scope="col" className="px-6 py-3">
                Product
              </th>
              <th scope="col" className="px-6 py-3">
                Qty
              </th>
              <th scope="col" className="px-6 py-3">
                Price
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {cartDetails?.products?.map((item) => (
              <tr
                key={item?._id}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
              >
                <td className="p-4">
                  <img
                    src={item?.product?.imageCover}
                    className="w-16 md:w-32 max-w-full max-h-full"
                    alt={item?.product?.title}
                  />
                </td>
                <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                  {item?.product?.title}
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center justify-center">
                    <button
                      onClick={() =>
                        item?.count == 1
                          ? removeItemFromCart(item?.product?.id)
                          : updateProductQuantity(
                              item?.product?.id,
                              item?.count - 1
                            )
                      }
                      className="inline-flex items-center justify-center p-1 me-3 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                      type="button"
                    >
                      <span className="sr-only">Quantity button</span>
                      <svg
                        className="w-3 h-3"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 18 2"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M1 1h16"
                        />
                      </svg>
                    </button>
                    <div>
                      <span className="bg-gray-50 w-14 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block px-2.5 py-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                        {item?.count}
                      </span>
                    </div>
                    <button
                      onClick={() =>
                        updateProductQuantity(
                          item?.product._id,
                          item?.count + 1
                        )
                      }
                      className="inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                      type="button"
                    >
                      <span className="sr-only">Quantity button</span>
                      <svg
                        className="w-3 h-3"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 18 18"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 1v16M1 9h16"
                        />
                      </svg>
                    </button>
                  </div>
                </td>
                <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white min-w-[110px]">
                  {item?.price} EGP
                </td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => removeItemFromCart(item?.product.id)}
                    className="btn font-medium text-white bg-red-700 hover:bg-red-600"
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Details Modal */}
      {showDetailsModal && (
        <>
          <div className="fixed inset-0 bg-slate-500 bg-opacity-50 flex justify-center items-center">
            <div className="bg-white w-1/2 h-1/2 flex p-12 justify-center items-center rounded-xl relative">
              <FaTimes
                className="text-3xl text-red-500 cursor-pointer absolute end-2 top-2"
                onClick={() => setShowDetailsModal(false)}
              />
              {/* Modal Content */}
              <form onSubmit={formik.handleSubmit} className="w-full">
                <input
                  {...formik.getFieldProps("details")}
                  name="details"
                  id="details"
                  type="text"
                  placeholder="Details"
                  className="w-full h-10 rounded-md border border-gray-300 p-2"
                />
                {formik.touched["details"] && (
                  <p className="text-red-500">{formik.errors["details"]}</p>
                )}
                <input
                  type="text"
                  {...formik.getFieldProps("phone")}
                  name="phone"
                  id="phone"
                  placeholder="phone"
                  className="w-full h-10 rounded-md border border-gray-300 mt-4 p-2"
                />
                {formik.touched["phone"] && (
                  <p className="text-red-500">{formik.errors["phone"]}</p>
                )}
                <input
                  type="text"
                  {...formik.getFieldProps("city")}
                  name="city"
                  id="city"
                  placeholder="city"
                  className="w-full h-10 rounded-md border border-gray-300 mt-4 p-2"
                />
                {formik.touched["city"] && (
                  <p className="text-red-500">{formik.errors["city"]}</p>
                )}
                <button
                  type="submit"
                  disabled={Object.keys(formik.errors).length > 0}
                  className="btn disabled:cursor-not-allowed mt-4 font-medium text-white bg-sky-700 hover:bg-sky-600 w-full"
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        </>
      )}
    </>
  );
}
