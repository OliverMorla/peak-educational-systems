"use client";
import "./page.scss";
import { motion } from "framer-motion";

const Register = () => {
  const handleSubmit = async () => {};

  return (
    <main className="register">
      <motion.form initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <div className="form__group" onSubmit={handleSubmit}>
          <label htmlFor="">First Name*</label>
          <input type="text" name="first_name" id="fname" />
        </div>
        <div className="form__group">
          <label htmlFor="">Last Name*</label>
          <input type="text" name="first_name" id="lname" />
        </div>
        <div className="form__group">
          <label htmlFor="">Email*</label>
          <input type="text" name="first_name" id="email" />
        </div>
        <div className="form__group">
          <label htmlFor="">Password*</label>
          <input type="password" name="first_name" id="password" />
        </div>
        <div className="form__group">
          <label htmlFor="">Password Confirm*</label>
          <input type="password" name="first_name" id="password-confirm" />
        </div>
        <div className="form__group">
          <label htmlFor="">Date of Birth*</label>
          <input type="date" name="first_name" id="fname" />
        </div>
        <div className="form__group">
          <label htmlFor="">Title*</label>
          <input type="text" name="first_name" id="fname" />
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
    </main>
  );
};

export default Register;
