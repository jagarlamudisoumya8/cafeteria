import { useState } from "react";
import Login from "./components/Login";
import Home from "./components/Home";
import TokenDetails from "./components/TokenDetails";
import RegisteredTokens from "./components/RegisteredTokens";

export default function App() {
  const [token, setToken] = useState(1);
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState([]);

  // Store latest order
  const [order, setOrder] = useState(null);

  // Store all orders
  const [orders, setOrders] = useState([]);

  const [showToken, setShowToken] = useState(false);
  const [showOrders, setShowOrders] = useState(false);
  

  // Add item
  const addItem = (item) => {
    setCart([...cart, item]);
  };

  // Remove item
  const removeItem = (name, canteen) => {
    const index = cart.findIndex(
      (item) =>
        item.name === name &&
        item.canteen === canteen
    );

    if (index !== -1) {
      const updated = [...cart];
      updated.splice(index, 1);
      setCart(updated);
    }
  };

  // Place Order
  const placeOrder = () => {
    const total = cart.reduce(
      (sum, item) => sum + item.price,
      0
    );

    const newOrder = {
      token: token,
      student: user.name,
      reg: user.reg,
      items: cart,
      total: total,
      payment: "Cash",
      status: "Preparing",
      time: new Date().toLocaleTimeString(),
    };

    // Save latest order
    setOrder(newOrder);

    // Save all orders
    setOrders((prev) => [...prev, newOrder]);

    setCart([]);
    setShowToken(true);
  };

  // Back to Menu
  const newOrder = () => {
    setShowToken(false);
    setToken((prev) => prev + 1);
  };

  // Login Page
  if (!user) {
    return <Login onLogin={setUser} />;
  }

  // Token Details Page
  if (showToken) {
    return (
      <TokenDetails
        order={order}
        newOrder={newOrder}
        viewTokens={() => {
          setShowToken(false);
          setShowOrders(true);
        }}
      />
    );
  }

  // Registered Tokens Page
  if (showOrders) {
    return (
      <RegisteredTokens
        orders={orders}
        back={() => setShowOrders(false)}
      />
    );
  }

  // Home Page
  return (
    <Home
      user={user}
      cart={cart}
      addItem={addItem}
      removeItem={removeItem}
      placeOrder={placeOrder}
      viewOrders={() => setShowOrders(true)}
    />
  );
}