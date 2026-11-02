const canteens = [
  "MHP Restarunt",
  "N Block canteen",
  "U Block canteen",
  "H Block 3rd Floor canteen",
  "A Block Canteen",
];

export default function Sidebar({ selected, setSelected, onLogout }) {
  return (
    <div className="sidebar">
      <h2>🍽 Vignan</h2>

      {canteens.map((item)=>(
        <button
          key={item}
          className={selected===item ? "active":""}
          onClick={()=>setSelected(item)}
        >
          {item}
        </button>
      ))}
      {onLogout && <button className="logout-btn" onClick={onLogout}>Log out</button>}
    </div>
  );
}
