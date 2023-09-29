import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmarkSquare } from "@fortawesome/free-solid-svg-icons";
import { signIn, signOut, useSession } from "next-auth/react";
import { SetStateAction, useRef, useState } from "react";
import { motion } from "framer-motion";
import { fadeEffect } from "@/config/framer.config";
import "./style.scss";
import { faFacebook, faGoogle } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";

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
  const [error, setError] = useState<string | undefined>(undefined);
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });

  // Testing Purposes
  // console.log(session)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await signIn("credentials", {
        email: inputs.email,
        password: inputs.password,
        redirect: false,
      });
      if (res?.error) {
        throw new Error("Error login in!");
      }
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      }
    }
  };

  return (
    <motion.aside
      className={"login__modal"}
      ref={loginRef}
      variants={fadeEffect}
      initial={"hidden"}
      animate={"visible"}
    >
      <FontAwesomeIcon
        icon={faXmarkSquare}
        className="modal__close-btn"
        onClick={() => setIsLoginOpen(!isLoginOpen)}
      />
      <h2 className="modal__login__title">
        {session?.user ? session.user.name : "Login"}
      </h2>
      <p
        className="modal__guest_login"
        style={{
          textAlign: "center",
          fontSize: ".7rem",
          fontWeight: "300",
        }}
      >
        <b>email</b>: guest@peakeducationalsystems.com
        <br />
        <b>password</b>: password
      </p>
      {session?.user === undefined && (
        <>
          {error && <div style={{ textAlign: "center" }}>{error}</div>}
          <form className="modal__login__form" onSubmit={handleSubmit}>
            <input
              type="text"
              name="email"
              id="form__login__input"
              placeholder="Enter email"
              onChange={(e) =>
                setInputs({
                  ...inputs,
                  [e.currentTarget.name]: e.currentTarget.value,
                })
              }
            />
            <input
              type="password"
              name="password"
              id="form__login__input"
              placeholder="Enter password"
              onChange={(e) =>
                setInputs({
                  ...inputs,
                  [e.currentTarget.name]: e.currentTarget.value,
                })
              }
            />
            <button type="submit"> Login </button>
          </form>

          <div className="modal__oauth__wrapper">
            <div className="oauth__divider">
              <button
                className="oauth__btn google__btn"
                onClick={() => signIn("google")}
              >
                <FontAwesomeIcon icon={faGoogle} />
                Sign in with Google
              </button>
            </div>
            <div className="oauth__divider">
              <button
                className="oauth__btn facebook__btn"
                onClick={() => signIn("facebook")}
              >
                <FontAwesomeIcon icon={faFacebook} />
                Sign in with Facebook
              </button>
            </div>
          </div>
        </>
      )}
      {session?.user !== undefined && (
        <button className="logout-btn" onClick={() => signOut()}>
          Log out
        </button>
      )}
    </motion.aside>
  );
};

export default Login;
