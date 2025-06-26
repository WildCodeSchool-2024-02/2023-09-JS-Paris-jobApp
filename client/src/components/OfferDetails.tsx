import {
  Button,
  Chip,
  Divider,
  Paper,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import type { Offer } from "../types/vite-env";

function OfferDetail(props: Offer) {
  const {
    title,
    description,
    location,
    company,
    date_of_creation,
    skills = [],
    status = "open",
  } = props;

  const theme = useTheme();
  const isClosed = status === "closed";

  return (
    <Paper
      elevation={3}
      sx={{
        maxWidth: 800,
        mx: "auto",
        mt: 4,
        p: 4,
        backgroundColor: isClosed
          ? theme.palette.mode === "dark"
            ? "#2c2c2c"
            : "#f0f0f0"
          : theme.palette.background.paper,
        opacity: isClosed ? 0.7 : 1,
      }}
    >
      <Typography variant="h4" gutterBottom>
        {title}
      </Typography>

      <Typography variant="subtitle1" color="text.secondary" gutterBottom>
        🏢 {company} — 📍 {location}
      </Typography>

      {date_of_creation && (
        <Typography variant="caption" color="text.secondary">
          📅 Publiée le :{" "}
          {new Date(date_of_creation).toLocaleDateString("fr-FR")}
        </Typography>
      )}

      <Divider sx={{ my: 2 }} />

      <Typography variant="body1" paragraph>
        {description}
      </Typography>

      {skills && (
        <>
          <Typography variant="subtitle2" gutterBottom>
            Compétences requises :
          </Typography>
          <Stack direction="row" spacing={1} flexWrap="wrap" mb={2}>
            {(skills as string)?.split(",")?.map((skill, index) => (
              <Chip key={index} label={skill} color="primary" />
            ))}
          </Stack>
        </>
      )}

      <Divider sx={{ my: 2 }} />

      <Button
        variant="contained"
        disabled={isClosed}
        size="large"
        fullWidth
        color={isClosed ? "inherit" : "primary"}
      >
        {isClosed ? "Offre fermée" : "Postuler"}
      </Button>
    </Paper>
  );
}

export default OfferDetail;
