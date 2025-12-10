import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { UserContextProvider } from "./context/userContext.jsx";
import { ProductContextProvider } from "./context/ProductContext.jsx";
import { CartContextProvider } from "./context/CartContext.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <CartContextProvider>
      <ProductContextProvider>
        <UserContextProvider>
          <App />
        </UserContextProvider>
      </ProductContextProvider>
    </CartContextProvider>
  </BrowserRouter>
);
