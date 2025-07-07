import { useContext, useEffect, useState } from "react";
import { UserContext } from "../contexts/user.context";
import type { Offer } from "../types/vite-env";
import { toast } from "react-toastify";
import OfferCard from "../components/OfferCard";

function Favorites() {
  const context = useContext(UserContext);
  const [offers, setOffers] = useState<Offer[]>([]);
	const [updatedFavorite, setUpdatedFavorite] = useState<boolean>(false);

  useEffect(() => {
    const loadFavorites = async () => {
      try {
        const fetchOptions = {
          headers: { Authorization: `Bearer ${context?.user?.token}` },
        };
        const response = await fetch(
          `http://localhost:3310/api/users/${context?.user?.id}/favorites`,
          fetchOptions,
        );
        if (!response.ok) toast.warning("Aucun favoris trouvée.");
        else {
          const offers = await response.json();
          setOffers(offers);
        }
      } catch (error) {
        console.error(error);
        toast.error("Une erreur est survenue");
      }
    };
    loadFavorites();
		console.info(updatedFavorite);
  }, [context, updatedFavorite]);

  return (
    <main>
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
						favorite={true}
						setUpdatedFavorite={setUpdatedFavorite}
          />
        </>
      ))}
    </main>
  );
}

export default Favorites;
