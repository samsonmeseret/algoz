import { useState } from "react";
import reactLogo from "./assets/react.svg";
import Dashboard from "./components/Dashboard/Dashboard";
import "./App.css";
import Login from "./components/Auth/Login";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <Dashboard />
      {/* <Login /> */}
    </div>
  );
}

export default App;
