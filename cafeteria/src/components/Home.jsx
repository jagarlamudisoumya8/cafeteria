import { useState } from "react";
import Sidebar from "./Sidebar";
import FoodGrid from "./FoodGrid";
import Cart from "./Cart";

export default function Home({
  user,
  cart,
  addItem,
  removeItem,
  placeOrder,
  viewOrders,
}) {
  const [canteen, setCanteen] = useState("N Block");
  const [category, setCategory] = useState("Tiffins");

  const changeCanteen = (name) => {
    setCanteen(name);
    setCategory("Tiffins");
  };

  return (
    <div className="layout">
      {/* Sidebar */}
      <Sidebar
        selected={canteen}
        setSelected={changeCanteen}
      />

      {/* Main Content */}
      <div className="content">
        <div className="topbar">
          <div>
            <h2>Welcome, {user.name}</h2>
            <p>Reg No : {user.reg}</p>
          </div>

          <div style={{ textAlign: "right" }}>
            <h1>{canteen}</h1>

            <button
              className="view-btn"
              onClick={viewOrders}
            >
              Registered Tokens
            </button>
          </div>
        </div>

        {/* Category Buttons */}
        <div className="category-bar">
          {[
            "Tiffins",
            "Veg Curries",
            "Non-Veg Curries",
            "Rice",
            "Drinks",
            "Veg Snacks",
            "Non-Veg Snacks",
            "Shakes",
            "Pizzas",
            "Pastas"
          ].map((cat) => (
            <button
              key={cat}
              className={
                category === cat
                  ? "cat active"
                  : "cat"
              }
              onClick={() => setCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Food Menu */}
        <FoodGrid
          canteen={canteen}
          category={category}
          cart={cart}
          addItem={addItem}
          removeItem={removeItem}
        />
      </div>

      {/* Cart */}
      <Cart
        cart={cart}
        placeOrder={placeOrder}
      />
    </div>
  );
}