import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router";
import Tire from "./pages/Tire.tsx";
import Home from "./pages/Home.tsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path=":tireId" element={<Tire />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
