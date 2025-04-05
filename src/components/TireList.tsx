// components/TireList.tsx
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Tire } from "../types/types";

interface TireListProps {
  tires: Tire[];
  isLoading?: boolean;
}

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 90 },
  { field: "serialNumber", headerName: "Número de Série", flex: 1 },
  { field: "branchOfficeName", headerName: "Filial", flex: 1 },
  { field: "status", headerName: "Status", flex: 1 },
  {
    field: "currentPressure",
    headerName: "Pressão Atual (psi)",
    flex: 1,
    type: "number",
  },
  {
    field: "recommendedPressure",
    headerName: "Pressão Recomendada (psi)",
    flex: 1,
    type: "number",
  },
];

export const TireList = ({ tires, isLoading }: TireListProps) => {
  return (
    <div style={{ height: 630, width: "100%" }}>
      <DataGrid
        rows={tires}
        columns={columns}
        pageSizeOptions={[10, 25, 50]}
        initialState={{
          pagination: { paginationModel: { pageSize: 10, page: 0 } },
        }}
        loading={isLoading}
        getRowId={(row) => row.id}
        sx={{
          "& .MuiDataGrid-cell": {
            backgroundColor: "#e3f2fd",
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: "#bbdefb",
          },
          "& .MuiDataGrid-footerContainer": {
            backgroundColor: "#bbdefb",
          },
        }}
      />
    </div>
  );
};
