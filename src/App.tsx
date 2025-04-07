import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import HomePage from "./pages/HomePage.tsx";
import { ThemeProvider } from "@emotion/react";
import theme from "./config/palette.ts";
import TirePage from "./pages/TirePage.tsx";
import Header from "./components/Header.tsx";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <Header />
        <BrowserRouter>
          <div
            style={{
              marginTop: "40px",
              marginInline: "auto",
              padding: "0 100px 100px",
              width: "clamp(600px, 90%, 1700px)",
            }}
          >
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="tires/:tireId" element={<TirePage />} />
            </Routes>
          </div>
        </BrowserRouter>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
