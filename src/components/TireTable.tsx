import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Link } from "react-router";
import AnnouncementIcon from "@mui/icons-material/Announcement";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";
import theme from "../config/palette";
import AppButton from "./AppButton";
import useGetAllTires from "../hooks/useGetAllTires";
import { useState } from "react";
import { TireFilterState } from "../types/types";
import TireFilters from "./TireFilters";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import ErrorAlert from "./ErrorAlert";
import Loading from "./Loading";
import { motion } from "motion/react";

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
        data-testid="tire-detail-icon"
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

export const TireTable = () => {
  const [filters, setFilters] = useState<TireFilterState>({});
  const [isFilterOpen, setFilterOpen] = useState(false);

  const { data, isPending, isError, error, refetch, isFetching } =
    useGetAllTires({
      pageNumber: 0,
      pageSize: 100,
      ...filters,
    });

  if (isPending) {
    return <Loading />;
  }

  if (isError) {
    return <ErrorAlert message={error.message} />;
  }

  return (
    <>
      {isFilterOpen && (
        <TireFilters
          applyFilter={setFilters}
          initialState={filters}
          open={isFilterOpen}
          handleClose={() => setFilterOpen(false)}
        />
      )}

      <div className="h-full flex flex-col gap-y-4 items-center px-4">
        <motion.div
          initial={{ x: -400, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 2 }}
        >
          <h1>Prolog</h1>
          <h2 className="mb-2">Gestão de frota</h2>
        </motion.div>
      </div>

      <div className="w-full  flex flex-col gap-y-6 justify-center items-center">
        <motion.div
          initial={{ x: 400, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 2 }}
          className="flex gap-x-4"
        >
          <AppButton isLoading={isFetching} onClick={() => refetch()}>
            Atualizar lista
          </AppButton>

          <AppButton color="success" onClick={() => setFilterOpen(true)}>
            <FilterAltIcon className="mr-1" />
            Filtrar
          </AppButton>
        </motion.div>

        <div className="w-full min-h-[400px]">
          {!isPending && (
            <motion.div
              initial={{ x: 400, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 2 }}
              className="w-full  flex flex-col gap-y-6 justify-center items-center"
            >
              <DataGrid
                style={{ width: "100%" }}
                data-testid="tire-table"
                rows={data.content}
                columns={columns}
                pagination
                pageSizeOptions={[10, 25, 50]}
                initialState={{
                  pagination: { paginationModel: { pageSize: 10, page: 0 } },
                }}
                getRowId={(row) => row.id}
              />
            </motion.div>
          )}
        </div>

        <div className="flex items-center gap-x-2 self-start mb-14">
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
    </>
  );
};

export default TireTable;
