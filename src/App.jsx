import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

const caffeineTally = {
  Coffee: 0.4,      // 40mg per 100ml
  Tea: 0.2,         // 20mg per 100ml
  EnergyDrink: 0.32 // 32mg per 100ml
};

export default function App() {
  const [drink, setDrink] = useState("Coffee");
  const [amount, setAmount] = useState("");
  const [entries, setEntries] = useState([]);

  const addEntry = () => {
    const ml = Number(amount);
    if (ml > 0 && caffeineTally[drink]) {
      const caffeine = +(ml * caffeineTally[drink]).toFixed(1);
      setEntries([{ drink, ml, caffeine, time: new Date().toLocaleTimeString() }, ...entries]);
      setAmount("");
    }
  };

  const totalCaffeine = entries.reduce((sum, e) => sum + e.caffeine, 0);

  return (
    <div style={{
      maxWidth: 450,
      margin: "44px auto",
      padding: 28,
      background: "#3b1c0a",
      borderRadius: 18,
      fontFamily: "Inter, Din, sans-serif"
    }}>
      <h1 style={{
        textAlign: "center",
        marginBottom: 22,
        color: "#e8c5a5",
        fontWeight: 700,
        letterSpacing: "1px"
      }}>Caffeine Tracker</h1>

      <div style={{ 
        display: "flex", 
        alignItems: "center", 
        marginBottom: 18, 
        gap: 12 
      }}>
        <select value={drink} onChange={e => setDrink(e.target.value)}
          style={{
            fontSize: 16,
            padding: "7px 15px",
            borderRadius: 7,
            border: "1px solid #e8c5a5",
            background: "#794022",
            color: "#e8c5a5",
            fontWeight: 600
          }}>
          {Object.keys(caffeineTally).map(d =>
            <option key={d} value={d}>{d}</option>
          )}
        </select>
        <input
          type="number"
          min="0"
          value={amount}
          onChange={e => setAmount(e.target.value)}
          placeholder="Amount (ml)"
          style={{
            width: 110,
            padding: "8px",
            borderRadius: 7,
            border: "1px solid #e8c5a5",
            fontSize: 16,
            outline: "none",
            fontWeight: 500
          }}
        />
        <button
          onClick={addEntry}
          style={{
            padding: "8px 24px",
            background: "#e8c5a5",
            color: "#794022",
            border: "none",
            borderRadius: 9,
            fontWeight: 700,
            fontSize: 16,
            cursor: "pointer",
            transition: "background 0.18s"
          }}
        >Add</button>
      </div>

      <h2 style={{
        borderBottom: "1px solid #e8c5a5",
        paddingBottom: 8,
        marginTop: 10,
        marginBottom: 12,
        fontWeight: 700,
        color: "#e8c5a5"
      }}>Today's Log</h2>

      <ul style={{ paddingLeft: 0, marginBottom: 16 }}>
        {entries.length === 0 ? (
          <li style={{ 
            listStyle: "none", color: "#e8c5a5", padding: "14px 8px",
            borderRadius: 7, fontStyle: "bold", background: "#794022"
          }}>No entries yet. Log your first drink!</li>
        ) : (
          entries.map((entry, idx) => (
            <li
              key={idx}
              style={{
                background: "#e8c5a5",
                marginBottom: 7,
                padding: "10px 12px 8px 12px",
                borderRadius: 8,
                listStyle: "none",
                fontSize: 16,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between"
              }}
            >
              <span>
                <span style={{ fontWeight: "600", color: "#794022" }}>{entry.time}</span>
                {` | `}<span style={{fontWeight: "500"}}>{entry.ml}ml {entry.drink}</span>
              </span>
              <span style={{
                color: "#794022",
                fontWeight: "bold"
              }}>{entry.caffeine} mg</span>
            </li>
          ))
        )}
      </ul>

      <h2 style={{
        color: "#794022",
        fontWeight: "bold",
        background: "#faecc1",
        padding: "12px",
        borderRadius: 11,
        marginTop: 25,
        textAlign: "center",
      }}>
        Total caffeine today: {totalCaffeine} mg
      </h2>
    </div>
  );
}