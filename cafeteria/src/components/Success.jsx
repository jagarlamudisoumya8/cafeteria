export default function Success({
  user,
  token,
  newOrder,
}) {
  return (
    <div className="success">
      <div className="done">
        <div className="tick">✓</div>

        <h1>Order Placed Successfully!</h1>

        <h2>Token No : {token}</h2>

        <p>
          <b>Name:</b> {user.name}
        </p>

        <p>
          <b>Reg No:</b> {user.reg}
        </p>

        <button onClick={newOrder}>
          Back to Menu
        </button>
      </div>
    </div>
  );
}