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
import { toast } from "react-toastify";
import { useContext } from "react";
import { UserContext } from "../contexts/user.context";

interface OfferCardProps {
  id: number;
  title: string;
  description: string;
  location: string;
  company: string;
  date_of_creation: string;
  skills?: string;
  count: number;
  status?: "open" | "closed";
  favorite: boolean;
  setUpdatedFavorite: React.Dispatch<React.SetStateAction<boolean>>;
}

function OfferCard(props: OfferCardProps) {
  const {
    id,
    title,
    description,
    location,
    company,
    skills = null,
    status = "open",
    favorite,
    setUpdatedFavorite,
  } = props;

  const theme = useTheme();
  const isDarkMode = theme.palette.mode === "dark";
  const navigate = useNavigate();
	const context = useContext(UserContext);

	const addFavorite = async () => {
		try {
			const fetchOptions = {method: "POST", headers: {"Authorization": `Bearer ${context?.user?.token}`}};
			const response = await fetch(`http://localhost:3310/api/offers/${id}/favorite`, fetchOptions);
			if (!response.ok) toast.warning("Vous avez déjà rajouter cette offre en favories.");
			else {
				toast.success("L'offre à bien été rajouter a vos favories.");
				setUpdatedFavorite((prev) => !prev);
			}
		} catch (error) {
			console.error(error);
			toast.error("Une erreur est survenue.")
		}
	} 	

	const deleteFavorite = async () => {
		try {
			const fetchOptions = {method: "DELETE", headers: {"Authorization": `Bearer ${context?.user?.token}`}};
			const response = await fetch(`http://localhost:3310/api/offers/${id}/favorite`, fetchOptions);
			if (!response.ok) toast.warning("cette offre ne fait pas partie de vos favories");
			else {
				toast.success("L'offre à bien été supprimer de vos favories.");
				setUpdatedFavorite((prev) => !prev);
			} 
		} catch (error) {
			console.error(error);
			toast.error("Une erreur est survenue.")
		}
	} 	

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
          onClick={favorite ? deleteFavorite : addFavorite}
        >
          {favorite ? "Supprimer des favories" : "Ajouter aux favories"}
        </Button>
      </CardActions>
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
