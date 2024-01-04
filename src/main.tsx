import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import App from "./App";
import Music from "./Music";
import Gallery from "./Gallery";
import ErrorPage from "./error-page";
import "bootstrap/dist/css/bootstrap.css";
import "./main.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />
  },

  {
    path: "/Music",
    element: <Music />,
    errorElement: <ErrorPage />
  },

  {
    path: "/Gallery",
    element: <Gallery />,
    errorElement: <ErrorPage />
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
