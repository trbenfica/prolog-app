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
import { LinearProgress, Stack } from "@mui/material";
import ErrorAlert from "./ErrorAlert";

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

export const TireList = () => {
  const [filters, setFilters] = useState<TireFilterState>({});
  const [isFilterOpen, setFilterOpen] = useState(false);

  const { data, isPending, isError, error, refetch, isFetching } =
    useGetAllTires({
      pageNumber: 0,
      pageSize: 100,
      ...filters,
    });

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

      <div className="w-full  flex flex-col gap-y-6 justify-center items-center">
        <div className="flex gap-x-4">
          <AppButton isLoading={isFetching} onClick={() => refetch()}>
            Atualizar lista
          </AppButton>

          <AppButton color="success" onClick={() => setFilterOpen(true)}>
            <FilterAltIcon className="mr-1" />
            Filtros
          </AppButton>
        </div>

        <div className="w-full min-h-[400px]">
          {!isPending ? (
            <DataGrid
              style={{ width: "100%" }}
              rows={data.content}
              columns={columns}
              pagination
              pageSizeOptions={[10, 25, 50]}
              initialState={{
                pagination: { paginationModel: { pageSize: 10, page: 0 } },
              }}
              getRowId={(row) => row.id}
            />
          ) : (
            <Stack
              sx={{
                width: "100%",
                color: "grey.500",
                height: "400px",
                justifyContent: "center",
              }}
              spacing={2}
            >
              <LinearProgress color="secondary" />
              <LinearProgress color="success" />
              <LinearProgress color="inherit" />
            </Stack>
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
