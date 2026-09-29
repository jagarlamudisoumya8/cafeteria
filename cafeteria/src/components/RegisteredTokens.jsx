export default function RegisteredTokens({ orders, back }) {
  return (
    <div className="registered-page">
      <div className="token-card">
        <h1>Registered Tokens</h1>

        {orders.length === 0 ? (
          <div className="empty-token">
            <h2>No Orders Yet</h2>
            <p>Place your first order to generate a token.</p>
          </div>
        ) : (
          orders.map((o) => (
            <div key={o.token} className="order-box">
              {/* Token Number */}
              <div className="token-number">
                Token #{o.token}
              </div>

              {/* Details */}
              <div className="detail-row">
                <span>Name</span>
                <b>{o.student}</b>
              </div>

              <div className="detail-row">
                <span>Reg No</span>
                <b>{o.reg}</b>
              </div>

              <div className="detail-row">
                <span>Payment</span>
                <b>{o.payment}</b>
              </div>

              <div className="detail-row">
                <span>Status</span>
                <span className="status-badge">
                  {o.status}
                </span>
              </div>

              <div className="detail-row">
                <span>Time</span>
                <b>{o.time}</b>
              </div>

              {/* Ordered Items */}
              <div className="order-items">
                <h3>Order Details</h3>

                {o.items.map((item, index) => (
                  <div key={index} className="food-item">
                    <span>{item.name}</span>
                    <b>₹{item.price}</b>
                  </div>
                ))}
              </div>

              {/* Total */}
              <div className="total-row">
                <span>Total</span>
                <span>₹{o.total}</span>
              </div>
            </div>
          ))
        )}

        <button className="back-btn" onClick={back}>
          Back to Menu
        </button>
      </div>
    </div>
  );
}