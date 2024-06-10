import React from "react";
import ReactDOM from "react-dom/client";

import "./index.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./layout/Layout";

import Login from "./pages/Login";
import { ChakraProvider } from "@chakra-ui/react";
import Companies from "./pages/Companies";
import Jobs from "./pages/Jobs";
import UploadCompany from "./pages/UploadCompany";
import UploadJob from "./pages/UploadJob";
import CompanyDetails from "./pages/CompanyDetails";
import EditCompany from "./pages/EditCompany";
import SignUp from "./pages/SignUp";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PrivateComponent from "./pages/PrivateComponent";
import UpdateJob from "./pages/UpdateJob";

const router = createBrowserRouter([
  {
    path: "",
    element: <PrivateComponent />,
    children: [
      {
        path: "/",
        element: <Layout />,
        children: [
          { path: "", element: <Companies /> },
          { path: "uploadCompany", element: <UploadCompany /> },
          { path: "uploadJob/:name", element: <UploadJob /> },
          { path: "companyDetails/:name", element: <CompanyDetails /> },
          { path: "editCompany/:id", element: <EditCompany /> },
          { path: "updatejob/:id", element: <UpdateJob /> },
          { path: "jobs", element: <Jobs /> },
        ],
      },
    ],
  },
  { path: "login", element: <Login /> },
  { path: "signup", element: <SignUp /> },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ChakraProvider>
      <RouterProvider router={router} />
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        transition:Bounce
      />
    </ChakraProvider>
  </React.StrictMode>
);
