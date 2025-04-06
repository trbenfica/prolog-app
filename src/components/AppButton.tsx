import { Button } from "@mui/material";

interface ButtonProps {
  children: any;
  onClick: () => void;
  isLoading?: boolean;
}

const AppButton = ({ onClick, children, isLoading }: ButtonProps) => {
  return (
    <Button
      sx={{ borderRadius: "8px", fontWeight: 600 }}
      variant="contained"
      color="primary"
      onClick={onClick}
      loading={isLoading}
    >
      {children}
    </Button>
  );
};

export default AppButton;
