export default function Cart({ cart, placeOrder }) {
  const total = cart.reduce((a, b) => a + b.price, 0);

  return (
    <div className="cart">
      <h2>🛒 Cart</h2>

      {cart.map((item, i) => (
        <div key={i} className="item">
          <span>{item.name}</span>
          <b>₹{item.price}</b>
        </div>
      ))}

      <hr />

      <h3>Total : ₹{total}</h3>

      <button disabled={!cart.length} onClick={placeOrder}>
        Place Order
      </button>
    </div>
  );
}