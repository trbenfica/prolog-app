import { Alert } from "@mui/material";

interface ErrorAlertProps {
  message: string;
}

const ErrorAlert = ({ message }: ErrorAlertProps) => {
  return (
    <Alert
      sx={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
      }}
      severity="error"
      variant="filled"
      data-testid="error-alert"
    >
      {message}
    </Alert>
  );
};

export default ErrorAlert;
