import Header from "./components/Header";
import Products from './components/Products';
import Cart from "./components/Cart.jsx";
import Checkout from "./components/Checkout.jsx";
import {CartContextProvider} from './util/CartContext.jsx';
import { ModalContextProvider } from "./util/ModalContext.jsx";
import CheckoutFormData from "./components/CheckoutFormData.jsx";

function App() {
  return (
    <ModalContextProvider>
      <CartContextProvider>
        <Header />
        <Products />
        <Cart />
        <CheckoutFormData />
      </CartContextProvider>
    </ModalContextProvider>
  );
}
export default App;
