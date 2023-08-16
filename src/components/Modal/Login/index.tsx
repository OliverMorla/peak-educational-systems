import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmarkSquare } from "@fortawesome/free-solid-svg-icons";
import { signIn, signOut, useSession } from "next-auth/react";
import { SetStateAction, useRef } from "react";
import "./style.scss";

interface Props {
  isLoginOpen: boolean;
  setIsLoginOpen: React.Dispatch<SetStateAction<boolean>>;
}

const Login: React.FunctionComponent<Props> = ({
  isLoginOpen,
  setIsLoginOpen,
}) => {
  const loginRef = useRef<HTMLDivElement>(null);
  const { data: session } = useSession();
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
      <h2 className="login__title">
        {session?.user ? session.user.name : "Login"}
      </h2>
      {session?.user === undefined && (
        <>
          <form className="login__form" onSubmit={() => signIn()}>
            <input
              type="email"
              name="email"
              id="login__input"
              placeholder="Enter email"
            />
            <input
              type="password"
              name="password"
              id="login__input"
              placeholder="Enter password"
            />
            <button type="submit"> Login </button>
          </form>
          <button className="magic__btn">Sign in with Magic Link</button>
          <button className="google__btn" onClick={() => signIn("google")}>
            Sign in with Google
          </button>
          <button className="facebook__btn" onClick={() => signIn("facebook")}>
            Sign in with Facebook
          </button>
        </>
      )}
      {session?.user !== undefined && (
        <button className="logout-btn" onClick={() => signOut()}>
          Log out
        </button>
      )}
    </aside>
  );
};

export default Login;
