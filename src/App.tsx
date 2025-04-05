import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router";
import Tire from "./pages/TirePage.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import HomePage from "./pages/HomePage.tsx";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path=":tireId" element={<Tire />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
