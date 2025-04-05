import { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Pagination,
  CircularProgress,
  Box,
} from "@mui/material";
import useGetAllTires from "../hooks/useGetAllTires";
import type { Tire } from "../types/types";

const PAGE_SIZE = 10;

const TireList = () => {
  const [page, setPage] = useState(1);

  const { data, isPending, isError } = useGetAllTires({
    pageNumber: page - 1,
    pageSize: PAGE_SIZE,
  });

  const tires: Tire[] = data?.content ?? [];

  const handlePageChange = (
    _event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
  };

  if (isPending) {
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <CircularProgress />
      </Box>
    );
  }

  if (isError) {
    return (
      <Typography color="error" align="center" mt={4}>
        Erro ao carregar pneus.
      </Typography>
    );
  }

  return (
    <Box p={2}>
      <Grid container spacing={2}>
        {tires.map((tire) => (
          <Grid item xs={12} sm={6} md={4} key={tire.id}>
            <Card variant="outlined">
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {tire.serialNumber}
                </Typography>
                <Typography variant="body2">
                  Modelo: {tire.model.name} ({tire.make.name})
                </Typography>
                <Typography variant="body2">Status: {tire.status}</Typography>
                <Typography variant="body2">
                  Pressão atual: {tire.currentPressure} psi
                </Typography>
                <Typography variant="body2">
                  Recapagens: {tire.timesRetreaded}/{tire.maxRetreadsExpected}
                </Typography>
                <Typography variant="body2">
                  Local: {tire.branchOfficeName}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {data?.lastPage === false && (
        <Box mt={4} display="flex" justifyContent="center">
          <Pagination
            count={Math.ceil((data?.numberOfElements ?? 0) / PAGE_SIZE)}
            page={page}
            onChange={handlePageChange}
            color="primary"
          />
        </Box>
      )}
    </Box>
  );
};

export default TireList;
