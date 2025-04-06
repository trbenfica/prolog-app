import { useState } from "react";
import { Box, TextField, Typography } from "@mui/material";
import { TireFilterState, TireRequestParams } from "../types/types";
import AppButton from "./AppButton";

interface TireFiltersProps {
  onChange: (filters: TireFilterState) => void;
  initialState: TireFilterState;
}

const TireFilters = ({ onChange, initialState }: TireFiltersProps) => {
  const [filters, setFilters] = useState<TireFilterState>(initialState);

  const handleChange = (
    key: keyof TireRequestParams,
    value: string | number | number[]
  ) => {
    const updatedFilters = { ...filters, [key]: value };
    setFilters(updatedFilters);
  };

  const handleApplyFilter = () => {
    onChange({ ...filters });
  };

  return (
    <Box display="flex" flexDirection="column" gap={2} sx={{ marginBottom: 5 }}>
      <Typography variant="h6">Filtros</Typography>

      <TextField
        label="Texto livre"
        variant="outlined"
        size="small"
        onChange={(e) => handleChange("textQuery", e.target.value)}
      />

      <TextField
        label="Número de série"
        variant="outlined"
        size="small"
        onChange={(e) => handleChange("serialNumberTextQuery", e.target.value)}
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
      />

      <TextField
        label="ID da banda (Tread Make ID)"
        type="number"
        variant="outlined"
        size="small"
        onChange={(e) => handleChange("treadMakeId", parseInt(e.target.value))}
      />

      <TextField
        label="ID do modelo da banda (Tread Model ID)"
        type="number"
        variant="outlined"
        size="small"
        onChange={(e) => handleChange("treadModelId", parseInt(e.target.value))}
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
      />

      <AppButton onClick={handleApplyFilter}>Aplicar Filtros</AppButton>
    </Box>
  );
};

export default TireFilters;
