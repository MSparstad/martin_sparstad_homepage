import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import App from "./App";
import Music from "./Music";
import Gallery from "./Gallery";
import "bootstrap/dist/css/bootstrap.css";
import "./main.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },

  {
    path: "/Music",
    element: <Music />,
  },

  {
    path: "/Gallery",
    element: <Gallery />,
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
