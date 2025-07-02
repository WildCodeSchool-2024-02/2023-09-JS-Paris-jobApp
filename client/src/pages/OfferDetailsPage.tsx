import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import BackButton from "../components/BackButton"; // idem
import OfferDetail from "../components/OfferDetails"; // adapte le chemin si besoin
import type { Offer } from "../types/vite-env";
import { UserContext } from "../contexts/user.context";
import { toast } from "react-toastify";

function OfferDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [offer, setOffer] = useState<Offer>();
	const context = useContext(UserContext);

  useEffect(() => {
    const loadOffer = async () => {
			try {
				const fetchOptions = {
					headers: { Authorization: `Bearer ${context?.user?.token}` },
				};
        const response = await fetch(`http://localhost:3310/api/offers/${id}`, fetchOptions);
				if (!response.ok) toast.warning("Vous devez authentifier pour effectuer cette action.");
				else {
					const offer = await response.json();
					setOffer(offer);
				}
      } catch (error) {
        console.error(error);
      }
    };
    loadOffer();
  }, [id, context]);

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
