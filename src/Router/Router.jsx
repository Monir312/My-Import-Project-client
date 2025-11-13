import React from "react";
import { createBrowserRouter } from "react-router";
import Home from "../pages/Home/Home";
import MainLayout from "../layouts/MainLayout";
import Loading from "../pages/Loading";
import AllProduct from "../pages/AllProduct/AllProduct";
import MyImport from "../pages/MyImport/MyImport";
import ProductDetails from "../pages/ProductDetails/ProductDetails";
import Login from "../pages/Login/Login";
import Registration from "../pages/Registration/Registration";
import PrivateRoute from "../Routes/PrivateRoute";
import ErrorPage from "../pages/404Page/ErrorPage";
import AddExport from "../pages/AddExport/AddExport";
import MyExport from "../pages/MyExport/MyExport";


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
        path: "/all-products", 
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
        path: "/add-exported-product",
        element: (
          <PrivateRoute>
            <AddExport />

          </PrivateRoute>
        ),
      },
      {
        path: "/product-details/:productId",
        element: (
          <PrivateRoute>
            <ProductDetails />
          </PrivateRoute>
        ),
      },
      {
        path: "/my-exported-products",
        element: <MyExport />,
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

