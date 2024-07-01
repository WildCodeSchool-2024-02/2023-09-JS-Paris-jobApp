import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./form.css";

export default function Register() {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const role = useRef();
  const [cv, setCv] = useState("");
  const address = useRef();

  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstname,
          lastname,
          email,
          password,
          role: role.current.value,
          cv,
          address: address.current.value,
        }),
      });
      if (response.ok) {
        toast.success("Votre inscription à bien été prise en compte !");
        navigate("/login");
      } else {
        const errors = await response.json();
        errors.details.forEach(error => {
          toast.warn(error.message);
        });
      }
    } catch (error) {
      toast.error('Une erreur est survenue..')
    }
  };

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
          <input
            type="text"
            value={firstname}
            onChange={(e) => setFirstname(e.target.value)}
            required
            name="firstname"
          />
          <label htmlFor="firstname">firstname</label>
        </div>
        <div className="form_inputs">
          <input
            name="lastname"
            type="text"
            value={lastname}
            onChange={(e) => setLastname(e.target.value)}
            required
          />
          <label htmlFor="lastname">lastname</label>
        </div>
        <div className="form_inputs">
          <input
            name="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <label htmlFor="email">email</label>
        </div>
        <div className="form_inputs">
          <input
            name="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <label htmlFor="password">password</label>
        </div>
        <div className="form_inputs">
          <select ref={role} className="select" required>
            <option value="candidate">candidate</option>
            <option value="company">company</option>
          </select>
        </div>
        <div className="form_inputs">
          <input
            name="cv"
            value={cv}
            onChange={(e) => setCv(e.target.value)}
            required
          />
          <label htmlFor="cv">cv</label>
        </div>
        <div className="form_inputs">
          <input name="address" ref={address} required />
          <label htmlFor="address">address</label>
        </div>
        <button className="form_button" type="button" onClick={handleSubmit}>
          S'inscrire
        </button>
      </form>
      <div className="form_other">
        <button
          className="form_button_register"
          type="button"
          onClick={() => navigate("/login")}
        >
          Connexion
        </button>
      </div>
    </section>
  );
}
