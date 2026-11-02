export default function TokenDetails({ order, newOrder, viewTokens }) {
  return (
    <div className="success">
      <div className="done">
        <div className="tick">✓</div>

        <h1>Order Confirmed</h1>
        <h2>Token #{order.token}</h2>

        <hr />

        <p><b>Name:</b> {order.student}</p>
        <p><b>Reg No:</b> {order.reg}</p>
        <p><b>Payment:</b> {order.payment}</p>
        <p><b>Status:</b> {order.status}</p>
        <p><b>Time:</b> {order.time}</p>

        <hr />

        <h3>Order Details</h3>

        {order.items.map((item, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              justifyContent: "space-between",
              margin: "8px 0",
            }}
          >
            <span>{item.name}{item.quantity > 1 ? ` ×${item.quantity}` : ""}</span>
            <b>₹{item.price * (item.quantity || 1)}</b>
          </div>
        ))}

        <hr />

        <h2>Total : ₹{order.total}</h2>

        <button onClick={newOrder}>
          Back to Menu
        </button>
        {viewTokens && <button className="details-tokens-btn" onClick={viewTokens}>View Registered Tokens</button>}
      </div>
    </div>
  );
}
