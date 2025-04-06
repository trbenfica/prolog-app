import useGetAllTires from "../hooks/useGetAllTires";
import AppButton from "../components/AppButton";
import { TireList } from "../components/TireList";

const HomePage = () => {
  const { data, refetch, isFetching } = useGetAllTires();

  if (!data) {
    return <p>Loading</p>;
  }

  return (
    <div className="h-full flex flex-col gap-y-4 items-center p-4">
      <h1>Prolog</h1>
      <h2>Gestão de frota</h2>

      <AppButton isLoading={isFetching} onClick={() => refetch()}>
        Atualizar lista
      </AppButton>

      <TireList tires={data?.content} />
    </div>
  );
};

export default HomePage;
