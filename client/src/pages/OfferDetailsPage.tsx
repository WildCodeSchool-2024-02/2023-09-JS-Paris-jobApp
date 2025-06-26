import { useEffect, useState } from "react";
import { useParams } from "react-router";
import BackButton from "../components/BackButton"; // idem
import OfferDetail from "../components/OfferDetails"; // adapte le chemin si besoin
import type { Offer } from "../types/vite-env";

function OfferDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [offer, setOffer] = useState<Offer>();

  const loadOffer = async () => {
    try {
      const response = await fetch(`http://localhost:3310/api/offers/${id}`);
      const offer = await response.json();
      setOffer(offer);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadOffer();
  }, [loadOffer]);

  if (!offer) {
    return (
      <div style={{ textAlign: "center", marginTop: "2rem" }}>
        <BackButton />
        <h2>Offre introuvable</h2>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 800, margin: "2rem auto", padding: "0 1rem" }}>
      <BackButton />
      <OfferDetail
        key={offer.id}
        id={offer.id}
        title={offer.title}
        description={offer.description}
        location={offer.location}
        company={offer.company}
        skills={offer?.skills}
        count={offer?.count}
        status={offer.status as "open" | "closed"}
        date_of_creation={offer.date_of_creation}
      />
    </div>
  );
}

export default OfferDetailPage;
