import { useNavigate } from "react-router";
import "react-toastify/dist/ReactToastify.css";
import "./form.css";

export default function Register() {
  const navigate = useNavigate();

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
          <input type="text" required name="firstname" />
          <label htmlFor="firstname">firstname</label>
        </div>
        <div className="form_inputs">
          <input name="lastname" type="text" required />
          <label htmlFor="lastname">lastname</label>
        </div>
        <div className="form_inputs">
          <input name="email" type="email" required />
          <label htmlFor="email">email</label>
        </div>
        <div className="form_inputs">
          <input name="password" type="password" required />
          <label htmlFor="password">password</label>
        </div>
        <div className="form_inputs">
          <select className="select" required>
            <option value="candidate">candidate</option>
            <option value="company">company</option>
          </select>
        </div>
        <div className="form_inputs">
          <input name="cv" required />
          <label htmlFor="cv">cv</label>
        </div>
        <div className="form_inputs">
          <input name="address" required />
          <label htmlFor="address">address</label>
        </div>
        <button className="form_button" type="button">
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
