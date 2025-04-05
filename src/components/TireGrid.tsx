import {
  Grid,
  Card,
  CardContent,
  Typography,
  Pagination,
  Box,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import { useState } from "react";
import useGetAllTires from "../hooks/useGetAllTires";

const TireGrid = () => {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(9);

  const { data, isPending, isError } = useGetAllTires({
    pageNumber: page - 1,
    pageSize,
  });

  if (isPending) return <div>Carregando...</div>;
  if (isError || !data) return <div>Erro ao carregar pneus.</div>;

  const currentPage = data.pageNumber + 1;
  const totalPages = data.lastPage ? currentPage : currentPage + 1;

  return (
    <Box>
      <Grid container spacing={2}>
        {data.content.map((tire) => (
          <Grid item xs={12} sm={6} md={4} key={tire.id}>
            <a href={`/tires/${tire.id}`}>
              <Card sx={{ cursor: "pointer" }}>
                <CardContent>
                  <Typography variant="h6">{tire.serialNumber}</Typography>
                  <Typography variant="body2">{tire.status}</Typography>
                  <Typography variant="body2">
                    {tire.branchOfficeName}
                  </Typography>
                </CardContent>
              </Card>
            </a>
          </Grid>
        ))}
      </Grid>

      <div className="flex justify-center items-center mt-8">
        <Box display="flex" justifyContent="center">
          <Pagination
            count={totalPages}
            page={page}
            onChange={(_, newPage) => setPage(newPage)}
            color="primary"
          />
        </Box>

        <Box mb={2} display="flex" justifyContent="flex-end">
          <FormControl size="small">
            <InputLabel id="page-size-label">Itens por página</InputLabel>
            <Select
              sx={{ bgcolor: "white", width: "100px" }}
              labelId="page-size-label"
              value={pageSize}
              label="Itens por página"
              onChange={(e) => {
                setPageSize(Number(e.target.value));
                setPage(1); // reseta a página ao mudar o tamanho
              }}
            >
              <MenuItem value={9}>9</MenuItem>
              <MenuItem value={18}>18</MenuItem>
              <MenuItem value={27}>27</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </div>
    </Box>
  );
};

export default TireGrid;
