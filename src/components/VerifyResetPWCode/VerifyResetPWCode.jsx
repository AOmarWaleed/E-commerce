// import Style from './VefiryResetPwCode.module.css';
import axios from "axios";
import { useFormik } from "formik";
import { useState } from "react";
import { FaSpinner } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";

export default function VerifyResetPwCode() {
  const [loading, setLoading] = useState(false);

  const validationSchema = Yup.object().shape({
    resetCode: Yup.string()
      .required("Code field is required!")
      .length(6, "Invalid code!"),
  });

  const initialValues = {
    resetCode: "",
  };

  const navigate = useNavigate();
  function onSubmit(values) {
    // console.log(values);
    setLoading(true);
    axios
      .post(`${import.meta.env.VITE_BASE_URL}/auth/verifyResetCode`, values)
      .then(() => {
        navigate("/createNewPassword");
      })
      .catch((error) => {
        console.log(error.response.data.message);
        formik.errors["code"] = error.response.data.message;
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
      <h2>Verify Code sent to your email</h2>
      <form onSubmit={formik.handleSubmit}>
        <input
          {...formik.getFieldProps("resetCode")}
          type="text"
          name="resetCode"
          id="resetCode"
          className="block py-4 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
          placeholder="Enter code"
        />
        {formik.touched["resetCode"] && (
          <p className="text-red-500">{formik.errors["resetCode"]}</p>
        )}
        <button
          type="submit"
          className="btn mt-4 bg-green-500 text-white w-full disabled:cursor-not-allowed"
          disabled={
            loading || !formik.isValid || Object.keys(formik.errors).length > 0
          }
        >
          {loading ? <FaSpinner className="animate-spin mx-auto" /> : "Confirm code"}
        </button>
      </form>
    </div>
  );
}
