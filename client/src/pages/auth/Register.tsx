import { useNavigate } from "react-router";
import "react-toastify/dist/ReactToastify.css";
import "./form.css";
import { useRef } from "react";
import { toast } from "react-toastify";

export default function Register() {
  const navigate = useNavigate();

  const firstname = useRef<HTMLInputElement>(null);
  const lastname = useRef<HTMLInputElement>(null);
  const email = useRef<HTMLInputElement>(null);
  const password = useRef<HTMLInputElement>(null);
  const role = useRef<HTMLSelectElement>(null);
  const cv = useRef<HTMLInputElement>(null);
  const address = useRef<HTMLInputElement>(null);


  const register = async () => {
    try {
      const fetchOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstname: (firstname.current as HTMLInputElement).value,
          lastname: (lastname.current as HTMLInputElement).value,
          email: (email.current as HTMLInputElement).value,
          password: (password.current as HTMLInputElement).value,
          role: (role.current as HTMLSelectElement).value,
          cv: (cv.current as HTMLInputElement).value,
          address: (address.current as HTMLInputElement).value,
        }),
      };
      const response = await fetch(
        "http://localhost:3310/api/users",
        fetchOptions,
      );
      if (!response.ok) toast.warning("Veuillez préciser tout les champs obligatoire.");
      else {
        toast.success("Votre inscription à bien été prise en compte");
        navigate("/login");
      }
    } catch (error) {
      console.error(error);
      toast.error("Une erreur est survenue");
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
          <input ref={firstname} type="text" required name="firstname" />
          <label htmlFor="firstname">firstname</label>
        </div>
        <div className="form_inputs">
          <input ref={lastname} name="lastname" type="text" required />
          <label htmlFor="lastname">lastname</label>
        </div>
        <div className="form_inputs">
          <input ref={email} name="email" type="email" required />
          <label htmlFor="email">email</label>
        </div>
        <div className="form_inputs">
          <input ref={password} name="password" type="password" required />
          <label htmlFor="password">password</label>
        </div>
        <div className="form_inputs">
          <select ref={role} className="select" required>
            <option value="candidate">candidate</option>
            <option value="company">company</option>
          </select>
        </div>
        <div className="form_inputs">
          <input ref={cv} name="cv" required />
          <label htmlFor="cv">cv</label>
        </div>
        <div className="form_inputs">
          <input ref={address} name="address" required />
          <label htmlFor="address">address</label>
        </div>
        <button onClick={register} className="form_button" type="button">
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
