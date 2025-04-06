import { useState } from "react";
import { Backdrop, Box, TextField, Typography } from "@mui/material";
import { TireFilterState, TireRequestParams } from "../types/types";
import AppButton from "./AppButton";

interface TireFiltersProps {
  applyFilter: (filters: TireFilterState) => void;
  initialState: TireFilterState;
  open: boolean;
  handleClose: () => void;
}

const TireFilters = ({
  applyFilter,
  initialState,
  open,
  handleClose,
}: TireFiltersProps) => {
  const [filters, setFilters] = useState<TireFilterState>(initialState);

  const handleChange = (
    key: keyof TireRequestParams,
    value: string | number | number[]
  ) => {
    const updatedFilters = { ...filters, [key]: value };
    setFilters(updatedFilters);
  };

  const handleRemoveFilters = () => {
    applyFilter({});
    handleClose();
  };

  const handleApplyFilter = () => {
    applyFilter({ ...filters });
    handleClose();
  };

  return (
    <Backdrop
      sx={(theme) => ({
        color: "#fff",
        zIndex: theme.zIndex.drawer + 1,
      })}
      open={open}
    >
      <Box
        display="flex"
        flexDirection="column"
        gap={2}
        sx={{
          backgroundColor: "white",
          padding: "50px",
          color: "black",
          borderRadius: 8,
          width: "40%",
          minWidth: "600px",
          alignItems: "center",
        }}
      >
        <Typography variant="h4">Aplicar Filtros</Typography>

        <TextField
          label="Texto livre"
          variant="outlined"
          size="small"
          onChange={(e) => handleChange("textQuery", e.target.value)}
          sx={{ width: "100%" }}
          value={filters.textQuery}
        />

        <TextField
          label="Número de série"
          variant="outlined"
          size="small"
          onChange={(e) =>
            handleChange("serialNumberTextQuery", e.target.value)
          }
          sx={{ width: "100%" }}
          value={filters.serialNumberTextQuery}
        />

        <TextField
          label="IDs de marcas (ex: 1,2,3)"
          variant="outlined"
          size="small"
          onChange={(e) =>
            handleChange(
              "makeIds",
              e.target.value
                .split(",")
                .map((id) => parseInt(id.trim()))
                .filter((id) => !isNaN(id))
            )
          }
          sx={{ width: "100%" }}
          value={filters.makeIds}
        />

        <TextField
          label="IDs de modelos (ex: 1,2,3)"
          variant="outlined"
          size="small"
          onChange={(e) =>
            handleChange(
              "modelIds",
              e.target.value
                .split(",")
                .map((id) => parseInt(id.trim()))
                .filter((id) => !isNaN(id))
            )
          }
          sx={{ width: "100%" }}
          value={filters.modelIds}
        />

        <TextField
          label="ID da banda (Tread Make ID)"
          type="number"
          variant="outlined"
          size="small"
          onChange={(e) =>
            handleChange("treadMakeId", parseInt(e.target.value))
          }
          sx={{ width: "100%" }}
          value={filters.treadMakeId}
        />

        <TextField
          label="ID do modelo da banda (Tread Model ID)"
          type="number"
          variant="outlined"
          size="small"
          onChange={(e) =>
            handleChange("treadModelId", parseInt(e.target.value))
          }
          sx={{ width: "100%" }}
          value={filters.treadModelId}
        />

        <TextField
          label="Ciclos de vida atuais (ex: 0,1,2)"
          variant="outlined"
          size="small"
          onChange={(e) =>
            handleChange(
              "currentLifeCycles",
              e.target.value
                .split(",")
                .map((val) => parseInt(val.trim()))
                .filter((v) => !isNaN(v))
            )
          }
          sx={{ width: "100%" }}
          value={filters.currentLifeCycles}
        />

        <TextField
          label="IDs de dimensões (ex: 1,2,3)"
          variant="outlined"
          size="small"
          onChange={(e) =>
            handleChange(
              "dimensionsIds",
              e.target.value
                .split(",")
                .map((val) => parseInt(val.trim()))
                .filter((v) => !isNaN(v))
            )
          }
          sx={{ width: "100%" }}
          value={filters.dimensionsIds}
        />

        <div className="flex gap-x-2 mt-2">
          <AppButton color="success" onClick={handleApplyFilter}>
            Aplicar Filtros
          </AppButton>

          <AppButton color="error" onClick={handleRemoveFilters}>
            Remover Filtros
          </AppButton>

          <AppButton color="info" onClick={handleClose}>
            Cancelar
          </AppButton>
        </div>
      </Box>
    </Backdrop>
  );
};

export default TireFilters;
