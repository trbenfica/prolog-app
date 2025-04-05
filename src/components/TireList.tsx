import type { Tire } from "../types/types";

interface TireListProps {
  tires: Tire[];
}

const TireList = ({ tires }: TireListProps) => {
  if (tires.length === 0) {
    return <p>Nenhum pneu encontrado.</p>;
  }

  return (
    <ul className="space-y-2">
      {tires.map((tire) => (
        <li
          key={tire.id}
          className="p-4 border rounded-lg shadow-sm hover:shadow-md transition"
        >
          <div className="font-semibold text-lg">
            [{tire.serialNumber}] {tire.make.name} {tire.model.name}
          </div>
          <div className="text-sm text-gray-600">
            Status: <span className="font-medium">{tire.status}</span> — Vida
            útil: <span className="font-medium">{tire.currentLifeCycle}</span>
          </div>
          <div className="text-sm text-gray-600">
            Sulco central:{" "}
            <span className="font-medium">
              {tire.middleOuterTreadDepth?.toFixed(1)} mm
            </span>{" "}
            — Recapeado:{" "}
            <span className="font-medium">
              {tire.timesRetreaded > 0 ? "Sim" : "Não"}
            </span>
          </div>
          {tire.installed?.licensePlate && (
            <div className="text-sm text-gray-600">
              Instalado em:{" "}
              <span className="font-medium">{tire.installed.licensePlate}</span>
            </div>
          )}
        </li>
      ))}
    </ul>
  );
};

export default TireList;
