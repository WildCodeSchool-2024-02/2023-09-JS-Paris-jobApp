import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Chip,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import { useNavigate } from "react-router";
import type { Offer } from "../types/vite-env";

function OfferCard(props: Offer) {
  const {
    id,
    title,
    description,
    location,
    company,
    skills = [],
    status = "open",
  } = props;

  const theme = useTheme();
  const isDarkMode = theme.palette.mode === "dark";
  const navigate = useNavigate();

  return (
    <Card
      sx={{
        maxWidth: 400,
        backgroundColor:
          status === "closed"
            ? isDarkMode
              ? "#2c2c2c"
              : "#f5f5f5"
            : theme.palette.background.paper,
        border: "1px solid",
        borderColor: theme.palette.divider,
        opacity: status === "closed" ? 0.6 : 1,
        boxShadow: 3,
        transition: "0.3s",
      }}
    >
      <CardContent>
        <Typography variant="h6" component="div" gutterBottom>
          {title}
        </Typography>
        <Typography color="text.secondary" sx={{ mb: 1 }}>
          🏢 {company} — 📍 {location}
        </Typography>
        <Typography variant="body2" sx={{ mb: 2 }}>
          {description.length > 150
            ? `${description.slice(0, 150)}...`
            : description}
        </Typography>

        {skills && (
          <Stack direction="row" spacing={1} flexWrap="wrap">
            {(skills as string)?.split(",")?.map((skill) => (
              <Chip key={skill} label={skill} size="small" color="primary" />
            ))}
          </Stack>
        )}
      </CardContent>

      <CardActions>
        <Box sx={{ flexGrow: 1 }} />
        <Button
          size="small"
          variant="contained"
          disabled={status === "closed"}
          onClick={() => navigate(`/offer/${id}`)}
        >
          Voir l'offre
        </Button>
      </CardActions>
    </Card>
  );
}

export default OfferCard;
