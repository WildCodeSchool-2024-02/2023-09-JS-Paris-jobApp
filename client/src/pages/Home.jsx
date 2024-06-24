import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  const isLogged = false;

  useEffect(() => {
    if (!isLogged) return navigate("/login");
    return true;
  }, [isLogged, navigate])


  return (
    <section>
      <h2>Home</h2>
    </section>
  );
}
