import { Button } from "@mui/material";

interface ButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  isLoading?: boolean;
  color?:
    | "primary"
    | "inherit"
    | "secondary"
    | "success"
    | "error"
    | "info"
    | "warning";
}

const AppButton = ({
  onClick,
  children,
  isLoading,
  color = "primary",
}: ButtonProps) => {
  return (
    <Button
      sx={{ borderRadius: "8px", fontWeight: 600 }}
      variant="contained"
      color={color}
      onClick={onClick}
      loading={isLoading}
    >
      {children}
    </Button>
  );
};

export default AppButton;
