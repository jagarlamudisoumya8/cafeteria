import { useEffect, useState } from "react";
import Login from "./components/Login";
import Home from "./components/Home";
import TokenDetails from "./components/TokenDetails";
import RegisteredTokens from "./components/RegisteredTokens";
import { cancelOrder, createOrder, getOrders } from "./api";

function readStored(key, fallback) {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : fallback;
  } catch {
    return fallback;
  }
}

export default function App() {
  const [user, setUser] = useState(() => readStored("cafeteria_user", null));
  const [cart, setCart] = useState([]);
  const [orders, setOrders] = useState([]);
  const [order, setOrder] = useState(null);
  const [showToken, setShowToken] = useState(false);
  const [showOrders, setShowOrders] = useState(false);
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);
  const [error, setError] = useState("");
  const reg = user?.reg;

  useEffect(() => {
    if (!reg) {
      return undefined;
    }

    let active = true;
    getOrders(reg)
      .then((savedOrders) => {
        if (active) setOrders(savedOrders);
      })
      .catch((requestError) => {
        if (active) setError(requestError.message);
      });

    return () => {
      active = false;
    };
  }, [reg]);

  const addItem = (item) => setCart((previous) => [...previous, item]);

  const removeItem = (name, canteen) => {
    setCart((previous) => {
      const index = previous.findIndex((item) => item.name === name && item.canteen === canteen);
      if (index < 0) return previous;
      return previous.filter((_, itemIndex) => itemIndex !== index);
    });
  };

  const placeOrder = async () => {
    if (!cart.length || isPlacingOrder) return;
    setError("");
    setIsPlacingOrder(true);
    try {
      const savedOrder = await createOrder({
        reg: user.reg,
        name: user.name,
        items: cart.map(({ name, canteen }) => ({ name, canteen })),
      });
      setOrders((previous) => [savedOrder, ...previous]);
      setOrder(savedOrder);
      setShowToken(true);
      setCart([]);
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setIsPlacingOrder(false);
    }
  };

  const newOrder = () => {
    setShowToken(false);
    setOrder(null);
  };

  const viewOrders = async () => {
    setError("");
    try {
      setOrders(await getOrders(user.reg));
      setShowToken(false);
      setShowOrders(true);
    } catch (requestError) {
      setError(requestError.message);
    }
  };

  const logout = () => {
    localStorage.removeItem("cafeteria_user");
    setUser(null);
    setOrders([]);
    setOrder(null);
    setCart([]);
    setShowToken(false);
    setShowOrders(false);
    setError("");
  };

  if (!user) {
    return <Login onLogin={(nextUser) => {
      localStorage.setItem("cafeteria_user", JSON.stringify(nextUser));
      setUser(nextUser);
      setOrders([]);
      setShowToken(false);
    }} />;
  }

  const errorAlert = error && (
    <div className="global-error" role="alert">
      {error}
      <button aria-label="Dismiss error" onClick={() => setError("")}>×</button>
    </div>
  );

  if (showToken && order) {
    return <>{errorAlert}<TokenDetails order={order} newOrder={newOrder} viewTokens={viewOrders} /></>;
  }

  if (showOrders) {
    return (
      <>
        {errorAlert}
        <RegisteredTokens
          orders={orders}
          back={() => setShowOrders(false)}
          viewOrder={(savedOrder) => { setOrder(savedOrder); setShowOrders(false); setShowToken(true); }}
          onCancel={async (id) => {
            setError("");
            try {
              const updatedOrder = await cancelOrder(id, user.reg);
              setOrders((previous) => previous.map((saved) => saved._id === id ? updatedOrder : saved));
            } catch (requestError) {
              setError(requestError.message);
            }
          }}
        />
      </>
    );
  }

  return (
    <>
      {errorAlert}
      <Home user={user} cart={cart} addItem={addItem} removeItem={removeItem} placeOrder={placeOrder} isPlacingOrder={isPlacingOrder} viewOrders={viewOrders} onLogout={logout} />
    </>
  );
}
