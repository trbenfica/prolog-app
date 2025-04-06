import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Tire } from "../types/types";
import { Link } from "react-router";
import AnnouncementIcon from "@mui/icons-material/Announcement";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";
import theme from "../config/palette";

interface TireListProps {
  tires: Tire[];
  isLoading?: boolean;
}

const columns: GridColDef[] = [
  {
    field: "moreInfo",
    headerName: "",
    width: 45,
    sortable: false,
    filterable: false,
    renderCell: (params) => (
      <Link
        to={`/tires/${params.row.id}`}
        style={{ color: theme.palette.primary.main }}
      >
        <ArrowOutwardIcon />
      </Link>
    ),
  },
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
      />

      <div className="flex items-center gap-x-2 mt-4">
        <AnnouncementIcon color="primary" fontSize="large" />
        <p>
          Clique no ícone
          <span className="mx-1">
            <ArrowOutwardIcon />
          </span>{" "}
          para ir à página de detalhes do pneu!
        </p>
      </div>
    </div>
  );
};
