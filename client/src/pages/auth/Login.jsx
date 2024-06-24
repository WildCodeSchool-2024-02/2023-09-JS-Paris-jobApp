import "./form.css";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";

function Login() {

  const navigate = useNavigate();
  const email = useRef();
  const password = useRef();

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
        <button className="form_button" type="button">
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
