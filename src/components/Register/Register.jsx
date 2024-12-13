// import Style from './Register.module.css';
import axios from "axios";
import { useFormik } from "formik";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { FaSpinner } from "react-icons/fa";
import { UserContext } from "../../context/UserContext";

export default function Register() {
  const [isLoading, setIsLoading] = useState(false);
  const [registerError, setRegisterError] = useState("");
  const { setToken } = useContext(UserContext);
  const navigate = useNavigate();
  const inputs = [
    {
      name: "name",
      type: "text",
    },
    {
      name: "email",
      type: "email",
    },
    {
      name: "password",
      type: "password",
    },
    {
      name: "rePassword",
      type: "password",
    },
    {
      name: "phone",
      type: "tel",
    },
  ];

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .required("Name field is required!")
      .min(3, "Minimum name allowed is 3 characters.")
      .max(10, "Maximum name allowed is 10 characters."),
    email: Yup.string()
      .required("Email field is required!")
      .email("Invalid email!"),
    password: Yup.string()
      .required("password field is required!")
      .matches(
        /^[A-Z].{5,9}$/,
        "The Password must start with an uppercase letter followed by at least another 5 characters. Password has a maximum length of 10 characters"
      ),
    rePassword: Yup.string()
      .required("rePassword field is required!")
      .oneOf([Yup.ref("password")], "rePassword must match the password!"),
    phone: Yup.string()
      .required("Phone field is required!")
      .matches(/^01[0125][0-9]{8}$/, "Invalid egyptian phone number!"),
  });

  const initialValues = {
    name: "",
    email: "",
    password: "",
    rePassword: "",
    phone: "",
  };

  function onSubmit(values) {
    console.log(values);
    setIsLoading(true);
    setRegisterError("");
    axios
      .post("https://ecommerce.routemisr.com/api/v1/auth/signup", values)
      .then(({ data }) => {
        console.log(data);
        setToken(data.token);
        navigate("/");
      })
      .catch((error) => setRegisterError(error.response.data.message))
      .finally(() => setIsLoading(false));
  }

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  return (
    <>
      <h2 className="text-center">Register</h2>
      <form className="max-w-md mx-auto py-20" onSubmit={formik.handleSubmit}>
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
          className="bg-green-500 hover:bg-green-800 text-white mt-5 border block focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full  px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-500 dark:focus:ring-green-800"
        >
          {isLoading ? (
            <FaSpinner className="text-xl animate-spin mx-auto" />
          ) : (
            "Register"
          )}
        </button>
        <div>{registerError}</div>
      </form>
    </>
  );
}
