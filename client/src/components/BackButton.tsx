import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Button } from "@mui/material";
import { useNavigate } from "react-router";

function BackButton() {
  const navigate = useNavigate();

  return (
    <Button
      variant="outlined"
      startIcon={<ArrowBackIcon />}
      onClick={() => navigate(-1)}
    >
      Retour
    </Button>
  );
}

export default BackButton;
