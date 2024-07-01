import { useEffect, useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  const { auth } = useOutletContext();
  const [offers, setOffers] = useState([]);

  useEffect(() => {
    const fetchOffersByUser = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/offers/candidates`,
          {
            headers: {
              Authorization: `Bearer ${auth.token}`,
            },
            credentials: "include"
          }
        );
        if (response.ok) {
          const data = await response.json();
          setOffers(data);
        }
      } catch (error) {
        console.error(error);
      }
    };
    
    fetchOffersByUser();
    return () => {};
  }, [auth, navigate]);

  return (
    <section>
      <h2>Home</h2>
      {offers.map((offer) => (
        <p key={offer.id}>{offer.title}</p>
      ))}
    </section>
  );
}
