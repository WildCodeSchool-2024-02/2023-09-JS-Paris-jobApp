import "./form.css";
import { useNavigate } from "react-router";
import { useContext, useRef } from "react";
import { toast } from "react-toastify";
import { UserContext } from "../../contexts/user.context";

function Login() {
  const navigate = useNavigate();
  const email = useRef<HTMLInputElement>(null);
  const password = useRef<HTMLInputElement>(null);
	const context = useContext(UserContext);

  const login = async () => {
    try {
      const fetchOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email.current?.value,
          password: password.current?.value,
        }),
      };
			const response = await fetch("http://localhost:3310/api/users/login", fetchOptions);
			if (!response.ok) toast.warning("Identifiants incorrects.");
			else {
				const {userWithoutPassword, token} = await response.json();
				toast.success("Vous etes bien connecter.");
				const user = userWithoutPassword;
				user.token = token;
				context?.setUser(user);
				navigate("/");
			}
    } catch (error) {
      console.error(error);
      toast.error("Une erreur est survenue.");
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
          <input ref={email} type="text" name="email" required />
          <label htmlFor="email">email</label>
        </div>
        <div className="form_inputs">
          <input ref={password} type="password" name="password" required />
          <label htmlFor="password">password</label>
        </div>
        <button onClick={login} className="form_button" type="button">
          Se connecter
        </button>
      </form>
      <div className="form_other">
        <button
          className="form_button_register"
          type="button"
          onClick={() => navigate("/register")}
        >
          Inscription
        </button>
      </div>
    </section>
  );
}

export default Login;
