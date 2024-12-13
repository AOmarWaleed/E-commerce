// import Style from './ProtectedRoute.module.css';

import { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const { token } = useContext(UserContext);

  return token ? children : <Navigate to={"/login"}></Navigate>;
}
