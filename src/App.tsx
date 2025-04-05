import "./App.css";

function App() {
  return (
    <div className="h-full flex flex-col gap-y-4 items-center">
      <h1 className="text-blue-300">Prolog</h1>
      <h2>Gestão de frota</h2>

      <button onClick={() => console.log("oi")}>Obter lista de pneus</button>
    </div>
  );
}

export default App;
