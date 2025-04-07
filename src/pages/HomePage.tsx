import TireTable from "../components/TireTable";

const HomePage = () => {
  return (
    <div className="h-full flex flex-col gap-y-4 items-center px-4">
      <h1>Prolog</h1>
      <h2 className="mb-2">Gestão de frota</h2>

      <TireTable />
    </div>
  );
};

export default HomePage;
