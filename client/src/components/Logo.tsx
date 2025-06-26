import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
import { Box } from "@mui/material";
import { useNavigate } from "react-router";

function Logo() {
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        cursor: "pointer",
        userSelect: "none",
        color: "primary.main",
      }}
      onClick={() => navigate("/")}
    >
      <WorkOutlineIcon fontSize="large" />
    </Box>
  );
}

export default Logo;
