import TireList from "../components/TireList";
import useGetAllTires from "../hooks/useGetAllTires";

const Home = () => {
  const { refetch } = useGetAllTires();

  return (
    <div className="h-full flex flex-col gap-y-4 items-center">
      <h1 className="text-blue-300">Prolog</h1>
      <h2>Gestão de frota</h2>

      <button onClick={() => refetch()}>Atualizar lista</button>

      <TireList />
    </div>
  );
};

export default Home;
