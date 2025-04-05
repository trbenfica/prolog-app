import TireGrid from "../components/TireGrid";
import useGetAllTires from "../hooks/useGetAllTires";

const HomePage = () => {
  const { refetch } = useGetAllTires();

  return (
    <div className="h-full flex flex-col gap-y-4 items-center p-4">
      <h1>Prolog</h1>
      <h2>Gestão de frota</h2>

      <button onClick={() => refetch()}>Atualizar lista</button>

      <TireGrid />
    </div>
  );
};

export default HomePage;
