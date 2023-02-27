import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";

import { useSelector } from "react-redux";
import { useEffect } from "react";

function App() {
  const showCart = useSelector((state) => state.myCart.showCart);
  const cart = useSelector((state) => state.cart); // subscription

  useEffect(() => {
    fetch(
      "https://redux-shop-3a34c-default-rtdb.europe-west1.firebasedatabase.app/cart.json",
      { method: "PUT", body: JSON.stringify(cart) }
    );
  }, [cart]); // 'PUT' overwrites existing data

  return (
    <Layout>
      {!showCart && <Cart />}
      <Products />
    </Layout>
  );
}

export default App;
