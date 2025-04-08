import { Box, Typography, Paper } from "@mui/material";
import { useParams } from "react-router";
import useGetTireById from "../hooks/useGetTireById";
import { format } from "date-fns";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import ErrorAlert from "./ErrorAlert";
import Loading from "./Loading";
import { motion } from "motion/react";
import AppButton from "./AppButton";

export const TireDetails = () => {
  const params = useParams();

  const tireId =
    params.tireId && typeof params.tireId === "string"
      ? parseInt(params.tireId)
      : NaN;

  const {
    data: tire,
    isPending,
    isError,
    error,
    refetch,
    isFetching,
  } = useGetTireById(tireId);

  if (isNaN(tireId)) {
    return <ErrorAlert message="error: tireId is invalid" />;
  }

  if (isPending) return <Loading />;
  if (isError) return <ErrorAlert message={error.message} />;

  const rows = [
    { id: 1, label: "ID", value: tire.id },
    { id: 2, label: "Número de Série", value: tire.serialNumber },
    { id: 3, label: "ID Adicional", value: tire.additionalId },
    { id: 4, label: "Grupo da Empresa", value: tire.companyGroupName },
    { id: 5, label: "Filial", value: tire.branchOfficeName },
    { id: 6, label: "Ciclo de Vida Atual", value: tire.currentLifeCycle },
    { id: 7, label: "Reformas Realizadas", value: tire.timesRetreaded },
    {
      id: 8,
      label: "Máx. de Reformas Esperadas",
      value: tire.maxRetreadsExpected,
    },
    { id: 9, label: "Pressão Atual (psi)", value: tire.currentPressure },
    {
      id: 10,
      label: "Pressão Recomendada (psi)",
      value: tire.recommendedPressure,
    },
    {
      id: 11,
      label: "Sulco Interno Central",
      value: tire.middleInnerTreadDepth,
    },
    { id: 12, label: "Sulco Externo", value: tire.outerTreadDepth },
    {
      id: 13,
      label: "Sulco Externo Central",
      value: tire.middleOuterTreadDepth,
    },
    { id: 14, label: "Sulco Interno", value: tire.innerTreadDepth },
    { id: 15, label: "DOT", value: tire.dot },
    {
      id: 16,
      label: "Custo de Compra",
      value: `R$ ${tire.purchaseCost.toFixed(2)}`,
    },
    { id: 17, label: "Pneu Novo", value: tire.newTire ? "Sim" : "Não" },
    { id: 18, label: "Status", value: tire.status },
    {
      id: 19,
      label: "Criado em",
      value: format(new Date(tire.createdAt), "dd/MM/yyyy"),
    },
    { id: 20, label: "Marca", value: tire.make.name },
    { id: 21, label: "Modelo", value: tire.model.name },
    { id: 22, label: "Altura (cm)", value: tire.tireSize.height },
    { id: 23, label: "Largura (cm)", value: tire.tireSize.width },
    ...(tire.installed
      ? [
          {
            id: 24,
            label: "Instalado em",
            value: tire.installed.installedPosition,
          },
          { id: 25, label: "Veículo", value: tire.installed.licensePlate },
        ]
      : []),
    ...(tire.disposal
      ? [
          {
            id: 26,
            label: "Motivo Descarte",
            value: tire.disposal.disposalReasonDescription,
          },
        ]
      : []),
    ...(tire.analysis
      ? [{ id: 27, label: "Resultado da Análise", value: tire.analysis.reason }]
      : []),
  ];

  const columns: GridColDef[] = [
    { field: "label", headerName: "Informação", flex: 1 },
    { field: "value", headerName: "Valor", flex: 2 },
  ];

  return (
    <motion.div
      initial={{ x: 200, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 1.8 }}
    >
      <Paper sx={{ p: 4 }}>
        <div className="flex flex-col justify-center items-center mb-4 gap-y-4">
          <Typography variant="h4">Detalhes do Pneu</Typography>
          <AppButton isLoading={isFetching} onClick={() => refetch()}>
            Atualizar
          </AppButton>
        </div>
        <Box sx={{ minHeight: 600, height: "100%", width: "100%" }}>
          <DataGrid
            rows={rows}
            columns={columns}
            disableColumnMenu
            hideFooter
            rowSelection={false}
            data-testid="tire-details-table"
          />
        </Box>
      </Paper>
    </motion.div>
  );
};
