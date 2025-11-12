import React from "react";
import { createBrowserRouter } from "react-router";
import Home from "../pages/Home/Home";
import MainLayout from "../layouts/MainLayout";
import Loading from "../pages/Loading";
import AllProduct from "../pages/AllProduct/AllProduct";
import About from "../pages/About/About";
import MyImport from "../pages/MyImport/MyImport";
import AddProduct from "../pages/AddProduct/AddProduct";
import ProductDetails from "../pages/ProductDetails/ProductDetails";
import Login from "../pages/Login/Login";
import Registration from "../pages/Registration/Registration";
import PrivateRoute from "../Routes/PrivateRoute";
import ErrorPage from "../pages/404Page/ErrorPage";


export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Home />
      },
      {
        path: "/products",
        element: <AllProduct />,
        hydrateFallbackElement: <Loading></Loading>
      },
      {
        path: "/my-imports",
        element: (
          <PrivateRoute>
            <MyImport />
          </PrivateRoute>
        ),
      },
      {
        path: "/add-product",
        element: (
          <PrivateRoute>
            <AddProduct />
          </PrivateRoute>
        ),
      },
      {
        path: "/product-details/:id",
        element: (
          <PrivateRoute>
            <ProductDetails />
          </PrivateRoute>
        ),
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/auth/login",
        element: <Login />
      },
      {
        path: "/auth/register",
        element: <Registration />
      },
      {
        path: "*",
        element: <ErrorPage />
      },
    ],
  },
]);

