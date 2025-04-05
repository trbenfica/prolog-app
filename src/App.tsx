import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router";
import Tire from "./pages/Tire.tsx";
import Home from "./pages/Home.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path=":tireId" element={<Tire />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
