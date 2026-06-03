import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import ProductListing from "./pages/ProductListing";
import ProductDetails from "./pages/ProductDetails";
import Wishlist from "./pages/Wishlist";
import Cart from "./pages/Cart";
import UserProfile from "./pages/UserProfile";

const router = createBrowserRouter([
  {
    path:"/",
    element:<App/>,
  },
  {
    path:"/productListing",
    element:<ProductListing/>
  },
  {
    path:"/productDetails/:productId",
    element:<ProductDetails/>
  },
  {
    path:"/wishlist",
    element:<Wishlist/>
  },
  {
    path:"/cart",
    element:<Cart/>
  },
  {
    path:"/userProfile",
    element:<UserProfile/>
  }
]);


const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <RouterProvider router={ router } />
  </StrictMode>
)
