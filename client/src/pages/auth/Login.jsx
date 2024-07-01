import "./form.css";
import { useRef } from "react";
import { toast } from "react-toastify";
import { useNavigate, useOutletContext } from "react-router-dom";

function Login() {

  const navigate = useNavigate();
  const email = useRef();
  const password = useRef();

  const {setAuth} = useOutletContext();

  const handleSubmit = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/login`, {
        headers: {"Content-Type": "application/json"},
        method: "POST",
        body: JSON.stringify({email: email.current.value, password: password.current.value}),
        credentials: "include"
      });
      if (response.ok) {
        const user = await response.json();
        const token = response.headers.get("Authorization");
        setAuth({isLogged: true, user, token});
        navigate("/");
      } else toast.warn("identifiant incorrect");
    } catch (error) {
      toast.error("Un probleme est survenue.")
    }
  }

  return (
    <section className="form">
      <div className="form_logo">
        <span>Job</span> App
      </div>
      <div className="form_title">
        Log<span>IN</span>
      </div>
      <form className="form_items">
        <div className="form_inputs">
          <input type="text" name="email" ref={email} required />
          <label htmlFor="email">email</label>
        </div>
        <div className="form_inputs">
          <input type="password" name="password" ref={password} required />
          <label htmlFor="password">password</label>
        </div>
        <button className="form_button" type="button" onClick={handleSubmit}>
          Se connecter
        </button>
      </form>
      <div className="form_other">
        <button className="form_button_register" type="button" onClick={() => navigate('/register')}>
          Inscription
        </button>
      </div>
    </section>
  );
}

export default Login;
