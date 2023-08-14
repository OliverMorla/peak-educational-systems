"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import "./page.scss";

const Register = () => {
  const handleSubmit = async () => {};

  return (
    <main className="register">
      <motion.form
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        onSubmit={handleSubmit}
      >
        <div className="form__group">
          <div className="group">
            <label htmlFor="">First Name*</label>
            <input type="text" name="first_name" id="fname" />
          </div>
          <div className="group">
            <label htmlFor="">Last Name*</label>
            <input type="text" name="first_name" id="lname" />
          </div>
          <div className="group">
            <label htmlFor="">Email*</label>
            <input type="text" name="first_name" id="email" />
          </div>
        </div>

        <div className="form__group">
          <div className="group">
            <label htmlFor="">Password*</label>
            <input type="password" name="password" id="password" />
          </div>
          <div className="group">
            <label htmlFor="">Password Confirm*</label>
            <input
              type="password"
              name="password_confirm"
              id="password-confirm"
            />
          </div>
        </div>

        <div className="form__group">
          <label htmlFor="">Date of Birth*</label>
          <input type="date" name="date_of_birth" id="date_of_birth" />
        </div>
        <div className="form__group">
          <label htmlFor="">Title*</label>
          <input type="text" name="title" id="title" />
        </div>
        <div className="form__group">
          <label htmlFor="">Employment Type*</label>
          <input type="text" name="first_name" id="fname" />
        </div>
        <div className="form__group">
          <label htmlFor="">Employment Region*</label>
          <input type="text" name="first_name" id="fname" />
        </div>
        <div className="form__group">
          <label htmlFor="">Child Grade Level*</label>
          <input type="text" name="first_name" id="fname" />
        </div>
        <div className="form__group">
          <label htmlFor="">School Type*</label>
          <input type="text" name="first_name" id="fname" />
        </div>
        <div className="form__group">
          <label htmlFor="">School Region*</label>
          <input type="text" name="first_name" id="fname" />
        </div>
        <button className="form__register-btn" type="submit">
          Register
        </button>
      </motion.form>
      <Link href="/login" className="register__login-btn">
        Already a member, Click here to login!
      </Link>
    </main>
  );
};

export default Register;
