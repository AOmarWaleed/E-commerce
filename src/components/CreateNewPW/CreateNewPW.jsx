// import Style from './CreateNewPw.module.css';

import axios from "axios";
import { useFormik } from "formik";
import { useState } from "react";
import { FaSpinner } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";

export default function CreateNewPw() {
  const [isLoading, setIsLoading] = useState(false);
  const [loginError, setLoginError] = useState("");
  const navigate = useNavigate();

  const inputs = [
    {
      name: "email",
      type: "email",
    },
    {
      name: "newPassword",
      type: "password",
    },
  ];

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .required("Email field is required!")
      .email("Invalid email!"),
    newPassword: Yup.string()
      .required("password field is required!")
      .matches(
        /^[A-Z].{5,9}$/,
        "The Password must start with an uppercase letter followed by at least another 5 characters. Password has a maximum length of 10 characters"
      ),
  });

  const initialValues = {
    email: "",
    newPassword: "",
  };

  function onSubmit(values) {
    // console.log(values);
    setIsLoading(true);
    setLoginError("");
    axios
      .put("https://ecommerce.routemisr.com/api/v1/auth/resetPassword", values)
      .then(() => navigate("/login"))
      .catch((error) => setLoginError(error.response.data.message))
      .finally(() => setIsLoading(false));
  }

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  return (
    <div className="max-w-md mx-auto pt-20">
      <h2 className="text-center">Create new PW</h2>
      <form className="max-w-md mx-auto pt-20" onSubmit={formik.handleSubmit}>
        {inputs.map((input) => (
          <div className="relative z-0 w-full mb-5 group" key={input.name}>
            <input
              {...formik.getFieldProps(input.name)}
              type={input.type}
              name={input.name}
              id={input.name}
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
              placeholder=" "
            />
            <label
              htmlFor="name"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              {input.name}
            </label>
            {formik.touched[input.name] && (
              <p className="text-red-500">{formik.errors[input.name]}</p>
            )}
          </div>
        ))}

        <button
          type="submit"
          className="text-white mx-auto block bg-green-500 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
        >
          {isLoading ? (
            <FaSpinner className="text-xl animate-spin mx-auto" />
          ) : (
            "Submit"
          )}
        </button>
        <div>{loginError}</div>
      </form>
    </div>
  );
}
