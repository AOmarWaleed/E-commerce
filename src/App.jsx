import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import "./App.css";
import Layout from "./components/Layout/Layout";
import Home from "./components/Home/Home";
import NotFound from "./components/NotFound/NotFound";
import Products from "./components/Products/Products";
import Categories from "./components/Categories/Categories";
import Brands from "./components/Brands/Brands";
import Cart from "./components/Cart/Cart";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import UserContextProvider from "./context/UserContext";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import ProductDetails from "./components/ProductDetails/ProductDetails";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import CartContextProvider from "./context/CartContext";
import { Toaster } from "react-hot-toast";
import Wishlist from "./components/Wishlist/Wishlist";
import WishlistContextProvider from "./context/WishlistContext";
import ForgotPassword from "./components/ForgotPassword/ForgotPassword";
import CreateNewPw from "./components/CreateNewPW/CreateNewPW";
import VerifyResetPwCode from "./components/VerifyResetPWCode/VerifyResetPWCode";

const routes = createBrowserRouter(
  [
    {
      path: "",
      element: <Layout />,
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: "allorders",
          element: <Navigate to="/" />,
        },
        {
          path: "products",
          element: <Products />,
        },
        {
          path: "wishlist",
          element: (
            <ProtectedRoute>
              <Wishlist />
            </ProtectedRoute>
          ),
        },
        {
          path: "productDetails/:id",
          element: <ProductDetails />,
        },
        {
          path: "products/productDetails/:id",
          element: <ProductDetails />,
        },
        {
          path: "categories",
          element: (
            <ProtectedRoute>
              <Categories />
            </ProtectedRoute>
          ),
        },
        {
          path: "brands",
          element: (
            <ProtectedRoute>
              <Brands />
            </ProtectedRoute>
          ),
        },
        {
          path: "cart",
          element: (
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>
          ),
        },
        { path: "login", element: <Login /> },
        { path: "forgot-password", element: <ForgotPassword /> },
        { path: "verifyCode", element: <VerifyResetPwCode /> },
        { path: "createNewPassword", element: <CreateNewPw /> },
        { path: "register", element: <Register /> },
        { path: "*", element: <NotFound /> },
      ],
    },
  ]
  // { basename: "/ecommerce-route" }
);

const myClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 10 * 1000,
    },
  },
});

function App() {
  return (
    <>
      <QueryClientProvider client={myClient}>
        <UserContextProvider>
          <CartContextProvider>
            <WishlistContextProvider>
              <RouterProvider router={routes} />
              <Toaster position="top-right" />
            </WishlistContextProvider>
          </CartContextProvider>
        </UserContextProvider>
        <ReactQueryDevtools />
      </QueryClientProvider>
    </>
  );
}

export default App;
