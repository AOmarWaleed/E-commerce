// import Style from './ForgotPassword.module.css';
import axios from "axios";
import { useFormik } from "formik";
import { useState } from "react";
import { FaSpinner } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";

export default function ForgotPassword() {
  const [loading, setLoading] = useState(false);

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .required("Email field is required!")
      .email("Invalid email!"),
  });

  const initialValues = {
    email: "",
  };

  const navigate = useNavigate();

  function onSubmit(values) {
    // console.log(values);
    setLoading(true);
    axios
      .post(`${import.meta.env.VITE_BASE_URL}/auth/forgotPasswords`, values)
      .then(() => {
        navigate("/verifyCode");
      })
      .catch((error) => {
        console.log(error.response.data.message);
        formik.errors["email"] = error.response.data.message;
      })
      .finally(() => setLoading(false));
  }

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  return (
    <div className="max-w-md mx-auto pt-20">
      <h2>please enter your Email:</h2>
      <form onSubmit={formik.handleSubmit}>
        <input
          {...formik.getFieldProps("email")}
          type="email"
          name="email"
          id="email"
          className="block py-4 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
          placeholder="Enter Email"
        />
        {formik.touched["email"] && (
          <p className="text-red-500">{formik.errors["email"]}</p>
        )}
        <button
          type="submit"
          className="btn mt-4 bg-green-500 w-full text-white block disabled:cursor-not-allowed"
          disabled={
            loading || !formik.isValid || Object.keys(formik.errors).length > 0
          }
        >
          {loading ? <FaSpinner className="animate-spin mx-auto" /> : "Send code"}
        </button>
      </form>
    </div>
  );
}
