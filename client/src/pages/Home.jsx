import { useEffect } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  const {auth} = useOutletContext();

  useEffect(() => {
    if (!auth.isLogged) return navigate("/login");
    return () => {};
  }, [auth, navigate])


  return (
    <section>
      <h2>Home</h2>
    </section>
  );
}
