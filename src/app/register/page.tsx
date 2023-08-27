"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import Link from "next/link";
import "./page.scss";
import Loading from "@/components/Loading";

const Register = () => {
  const { register, loading } = useAuth();
  const router = useRouter();
  const [inputs, setInputs] = useState<RegisterInputs>({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    password_confirm: "",
    date_of_birth: "",
    title: "",
    emp_type: "",
    emp_region: "",
    child_grade_level: "",
    school_type: "",
    school_region: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputs({ ...inputs, [e.currentTarget.name]: e.currentTarget.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (inputs.password === inputs.password_confirm) {
      try {
        const res = await register(inputs as RequestInit);
        console.log(res);
        if (res.account_created) {
          router.push("/");
        } else {
          throw new Error(res.message);
        }
      } catch (err) {
        if (err instanceof Error) alert(err.message);
      }
    }
  };

  // Debugging Purposes
  console.log(inputs);

  return (
    <main className="register">
      <motion.form
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        onSubmit={handleSubmit}
      >
        <div className="form__group">
          <div className="group">
            <label htmlFor="first_name">First Name*</label>
            <input
              type="text"
              name="first_name"
              id="first_name"
              placeholder="Enter first name"
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="group">
            <label htmlFor="last_name">Last Name*</label>
            <input
              type="text"
              name="last_name"
              id="last_name"
              placeholder="Enter last name"
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="group">
            <label htmlFor="email">Email*</label>
            <input
              type="text"
              name="email"
              id="email"
              placeholder="Enter email"
              onChange={handleInputChange}
              required
            />
          </div>
        </div>

        <div className="form__group">
          <div className="group">
            <label htmlFor="password">Password*</label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Enter password"
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="group">
            <label htmlFor="password">Password Confirm*</label>
            <input
              type="password"
              name="password_confirm"
              id="password_confirm"
              placeholder="Enter password again"
              onChange={handleInputChange}
              required
            />
          </div>
        </div>

        <div className="form__group">
          <label htmlFor="date_of_birth">Date of Birth*</label>
          <input
            type="date"
            name="date_of_birth"
            id="date_of_birth"
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form__group">
          <label htmlFor="title">Title*</label>
          <input
            type="text"
            name="title"
            id="title"
            placeholder="Enter a job title"
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form__group">
          <fieldset className="emp-type__fieldset" name="emp_type">
            <legend>Employment Type</legend>
            <div className="emp-type__group">
              <input
                type="radio"
                name="emp_type"
                id="emp-type__btn"
                value={"Public"}
                onChange={handleInputChange}
              />
              <label htmlFor="public">Public</label>
            </div>
            <div className="emp-type__group">
              <input
                type="radio"
                name="emp_type"
                id="emp-type__btn"
                value={"Private"}
                onChange={handleInputChange}
              />
              <label htmlFor="public">Private</label>
            </div>
            <div className="emp-type__group">
              <input
                type="radio"
                name="emp_type"
                id="emp-type__btn"
                value={"Home"}
                onChange={handleInputChange}
              />
              <label htmlFor="public">Home</label>
            </div>
            <div className="emp-type__group">
              <input
                type="radio"
                name="emp_type"
                id="emp-type__btn"
                value={"Other"}
                onChange={handleInputChange}
              />
              <label htmlFor="public">Other</label>
            </div>
          </fieldset>
        </div>

        <div className="form__group">
          <fieldset className="emp-region__fieldset" name="emp_region">
            <legend>Employment Region</legend>
            <div className="emp-region__group">
              <input
                type="radio"
                name="emp_region"
                id=""
                value={"NYC"}
                onChange={handleInputChange}
              />
              <label htmlFor="region">NYC</label>
            </div>
            <div className="emp-region__group">
              <input
                type="radio"
                name="emp_region"
                id=""
                value={"Nassau"}
                onChange={handleInputChange}
              />
              <label htmlFor="region">Nassau</label>
            </div>
            <div className="emp-region__group">
              <input
                type="radio"
                name="emp_region"
                id=""
                value={"Suffolk"}
                onChange={handleInputChange}
              />
              <label htmlFor="region">Suffolk</label>
            </div>
          </fieldset>
        </div>

        <div className="form__group">
          <label htmlFor="grade-level">Select Grade Level:</label>
          <select
            name="grade-level"
            id="grade__level"
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
              setInputs({ ...inputs, child_grade_level: e.currentTarget.value })
            }
          >
            <option value="pre-k">Pre-K</option>
            <option value="k">Kindergarten</option>
            <option value="1">1st Grade</option>
            <option value="2">2nd Grade</option>
            <option value="3">3rd Grade</option>
            <option value="4">4th Grade</option>
            <option value="5">5th Grade</option>
            <option value="6">6th Grade</option>
            <option value="7">7th Grade</option>
            <option value="8">8th Grade</option>
            <option value="9">9th Grade</option>
            <option value="10">10th Grade</option>
            <option value="11">11th Grade</option>
            <option value="12">12th Grade</option>
          </select>
        </div>

        <div className="form__group">
          <fieldset className="school-type__fieldset" name="school_type">
            <legend>School Type</legend>
            <div className="school-type__group">
              <input
                type="radio"
                name="school_type"
                id=""
                value={"Public"}
                onChange={handleInputChange}
              />
              <label htmlFor="region">Public</label>
            </div>
            <div className="school-type__group">
              <input
                type="radio"
                name="school_type"
                id=""
                value={"Private"}
                onChange={handleInputChange}
              />
              <label htmlFor="region">Private</label>
            </div>
            <div className="school-type__group">
              <input
                type="radio"
                name="school_type"
                id=""
                value={"Home"}
                onChange={handleInputChange}
              />
              <label htmlFor="region">Home</label>
            </div>
          </fieldset>
        </div>

        <div className="form__group">
          <fieldset className="school-region__fieldset" name="school_region">
            <legend>School Region</legend>
            <div className="school-region__group">
              <input
                type="radio"
                name="school_region"
                id=""
                value={"Nassau"}
                onChange={handleInputChange}
              />
              <label htmlFor="region">Nassau</label>
            </div>
            <div className="school-region__group">
              <input
                type="radio"
                name="school_region"
                id=""
                value={"NYC"}
                onChange={handleInputChange}
              />
              <label htmlFor="region">NYC</label>
            </div>
            <div className="school-region__group">
              <input
                type="radio"
                name="school_region"
                id=""
                value={"Suffolk"}
                onChange={handleInputChange}
              />
              <label htmlFor="region">Suffolk</label>
            </div>
          </fieldset>
        </div>

        {!loading ? (
          <button className="form__register-btn" type="submit">
            Register
          </button>
        ) : (
          <Loading />
        )}
      </motion.form>
      <Link href="/login" className="register__login-btn">
        Already a member, Click here to login!
      </Link>
    </main>
  );
};

export default Register;
