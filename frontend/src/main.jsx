import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { UserContextProvider } from "./context/userContext.jsx";
import { ProductContextProvider } from "./context/ProductContext.jsx";
import { CartContextProvider } from "./context/CartContext.jsx";
import { OrderContextProvider } from "./context/OrderContext.jsx";
import StoreContextProvider from "./context/StoreContext.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <StoreContextProvider>
      <OrderContextProvider>
        <CartContextProvider>
          <ProductContextProvider>
            <UserContextProvider>
              <App />
            </UserContextProvider>
          </ProductContextProvider>
        </CartContextProvider>
      </OrderContextProvider>
    </StoreContextProvider>
  </BrowserRouter>
);
