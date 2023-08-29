import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Register from "./Component/Register";

function App() {
  return (
    <div className="App">
      <h1>Register Auth</h1>

      <BrowserRouter>
      
        <Routes>
          <Route path="/" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
