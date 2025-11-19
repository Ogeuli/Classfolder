import { app } from "./Firebase/Firebase-config.js";

function App() {
  console.log("Firebase App:",app);
  return <div style={{fontSize: "24px", padding: "20px" }}>Firebase läuft </div>;
}

export default App;