import { TireList } from "../components/TireList";

const HomePage = () => {
  return (
    <div className="h-full flex flex-col gap-y-4 items-center p-4">
      <h1>Prolog</h1>
      <h2 className="mb-2">Gestão de frota</h2>

      <TireList />
    </div>
  );
};

export default HomePage;
