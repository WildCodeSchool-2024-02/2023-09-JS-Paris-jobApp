import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

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
      const response = await fetch(`${import.meta.env.VITE_API_URL}/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          firstname, lastname, email, password, role: role.current.value, cv, address: address.current.value
        })
      });
      if (response.ok) {
        navigate("/login")
      }
      else {
        console.error("erreur client.")
      }
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <section>
      <h2>Register</h2>
      <input
        placeholder="firstname"
        type="text"
        value={firstname}
        onChange={(e) => setFirstname(e.target.value)}
      />
      <input
        placeholder="lastname"
        type="text"
        value={lastname}
        onChange={(e) => setLastname(e.target.value)}
      />
      <input
        placeholder="email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        placeholder="password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <select ref={role}>
        <option value="candidate">candidate</option>
        <option value="company">company</option>
      </select>
      <input
        placeholder="cv"
        value={cv}
        onChange={(e) => setCv(e.target.value)}
      />
      <input placeholder="address" ref={address} />
      <button type="button" onClick={handleSubmit}>S'inscrire</button>
    </section>
  );
}
