import { LinearProgress, Stack } from "@mui/material";

const Loading = () => {
  return (
    <Stack
      sx={{
        width: "100%",
        color: "grey.500",
        height: "400px",
        justifyContent: "center",
      }}
      spacing={2}
      data-testid="loading"
    >
      <LinearProgress color="secondary" />
      <LinearProgress color="success" />
      <LinearProgress color="inherit" />
    </Stack>
  );
};

export default Loading;
