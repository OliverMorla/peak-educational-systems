import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmarkSquare } from "@fortawesome/free-solid-svg-icons";
import { useRef } from "react";
import "./style.scss";

const Login = ({ isLoginOpen, setIsLoginOpen }) => {
  const loginRef = useRef<HTMLDivElement>(null);
  return (
    <aside
      className={isLoginOpen ? "login__modal active" : "login__modal"}
      ref={loginRef}
    >
      <FontAwesomeIcon
        icon={faXmarkSquare}
        className="close__btn"
        onClick={() => setIsLoginOpen(!isLoginOpen)}
      />
      <form action="" className="login__form">
        <input type="email" name="email" id="email__input" />
        <input type="password" name="password" id="password__inpunt" />
        <button type="submit"> Login </button>
      </form>
      <button className="magic__btn">Sign in with Magic Link</button>
      <button className="google__btn">Sign in with Google</button>
      <button className="facebook__btn">Sign in with Facebook</button>
    </aside>
  );
};

export default Login;
