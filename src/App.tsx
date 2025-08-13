import { useState, useEffect } from "react";
import { sdk } from "@farcaster/miniapp-sdk";

function App() {
  const [count, setCount] = useState(0);

  // Run after component mounts
  useEffect(() => {
    sdk.actions.ready(); // Notify Farcaster the app is ready
  }, []);

  return (
    <div style={{ padding: 50, textAlign: "center" }}>
      <h1>Simple Counter</h1>
      <h2>{count}</h2>
      <button onClick={() => setCount(count + 1)}>+1</button>
      <button onClick={() => setCount(count - 1)} style={{ marginLeft: 10 }}>
        -1
      </button>
      <button onClick={() => setCount(0)} style={{ marginLeft: 10 }}>
        Reset
      </button>
    </div>
  );
}

export default App;
