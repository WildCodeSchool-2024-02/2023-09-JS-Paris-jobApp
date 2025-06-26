import "./Home.css";
import { Box, Button, Container, Stack } from "@mui/material";
import { useEffect, useState } from "react";
import OfferCard from "../components/OfferCard";
import type { Offer } from "../types/vite-env";

export default function Home() {
  const [offers, setOffers] = useState<Offer[]>([]);
  const [page, setPage] = useState(1);
  console.log(page, offers[0]?.count);

  const loadOffers = async () => {
    try {
      const response = await fetch(
        `http://localhost:3310/api/offers?include=skills&page=${page}&limit=12`,
      );
      const offers = await response.json();
      setOffers(offers);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadOffers();
  }, [page, loadOffers]);

  return (
    <section className="home">
      <div className="form_logo">
        <span>Job</span> App
      </div>
      <div className="form_title">Nos offres</div>
      <Container sx={{ mt: 4 }}>
        <Box display="flex" gap={4} flexWrap="wrap" justifyContent="center">
          {offers.map((offer) => (
            <>
              <OfferCard
                key={offer.id}
                id={offer.id}
                title={offer.title}
                description={offer.description}
                location={offer.location}
                company={offer.company}
                date_of_creation={offer.date_of_creation}
                skills={offer?.skills}
                count={offer?.count}
                status={offer.status}
              />
            </>
          ))}
        </Box>
        <Box sx={{ mt: 4, display: "flex", justifyContent: "center" }}>
          <Stack direction="row" spacing={2}>
            <Button
              variant="contained"
              color="secondary"
              disabled={page === 1} // mettre true si page === 1
              onClick={() => setPage(page - 1)}
            >
              Précédent
            </Button>

            <Button
              variant="contained"
              color="primary"
              disabled={page * 12 >= Number(offers[0]?.count)} // mettre true si page === totalPages
              onClick={() => setPage(page + 1)}
            >
              Suivant
            </Button>
          </Stack>
        </Box>
      </Container>
    </section>
  );
}
