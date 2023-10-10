"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useAuth } from "@/contexts/auth-context";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Loading from "@/components/Loading";
import "./page.scss";

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
    role: "",
    title: "",
    employment_type: null,
    employment_region: null,
    child_grade_level: "",
    school_type: null,
    school_region: null,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputs({ ...inputs, [e.currentTarget.name]: e.currentTarget.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (inputs.password === inputs.password_confirm) {
      try {
        const res = await register(inputs as RequestInit);
        if (res.account_created) {
          alert(res.message);
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
        className="register__form"
        onSubmit={handleSubmit}
      >
        <div className="register__form-group">
          <div className="form-group__item">
            <label htmlFor="first_name">First Name*</label>
            <input
              type="text"
              name="first_name"
              className="form-group__input"
              placeholder="Enter first name"
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group__item">
            <label htmlFor="last_name">Last Name*</label>
            <input
              type="text"
              name="last_name"
              className="form-group__input"
              placeholder="Enter last name"
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group__item">
            <label htmlFor="email">Email*</label>
            <input
              type="text"
              name="email"
              className="form-group__input"
              placeholder="Enter email"
              onChange={handleInputChange}
              required
            />
          </div>
        </div>

        <div className="register__form-group">
          <div className="form-group__item">
            <label htmlFor="password">Password*</label>
            <input
              type="password"
              name="password"
              className="form-group__input"
              placeholder="Enter password"
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group__item">
            <label htmlFor="password">Password Confirm*</label>
            <input
              type="password"
              name="password_confirm"
              className="form-group__input"
              placeholder="Enter password again"
              onChange={handleInputChange}
              required
            />
          </div>
        </div>

        <div className="register__form-group">
          <label htmlFor="date_of_birth">Date of Birth*</label>
          <input
            type="date"
            name="date_of_birth"
            className="form-group__input"
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="register__form-group">
          <fieldset className="form-group__fieldset" name="role">
            <legend>Role</legend>
            <div className="fieldset-group__item">
              <input
                type="radio"
                name="role"
                id="role-btn"
                value={"Teacher"}
                onChange={handleInputChange}
              />
              <label htmlFor="role">Teacher</label>
            </div>
            <div className="fieldset-group__item">
              <input
                type="radio"
                name="role"
                id="role-btn"
                value={"Parent"}
                onChange={handleInputChange}
              />
              <label htmlFor="role">Parent</label>
            </div>
            <div className="fieldset-group__item">
              <input
                type="radio"
                name="role"
                id="role-btn"
                value={"Student"}
                onChange={handleInputChange}
              />
              <label htmlFor="role">Student</label>
            </div>
            <div className="fieldset-group__item">
              <input
                type="radio"
                name="role"
                id="role-btn"
                value={"Other"}
                onChange={handleInputChange}
              />
              <label htmlFor="region">Other</label>
            </div>
          </fieldset>
        </div>

        <div className="register__form-group">
          <label htmlFor="title">Job Title*</label>
          <input
            type="text"
            name="title"
            id="title"
            placeholder="Enter a job title"
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="register__form-group">
          <fieldset className="form-group__fieldset" name="employment_type">
            <legend>Employment Type</legend>
            <div className="fieldset-group__item">
              <input
                type="radio"
                name="employment_type"
                id="emp-type__btn"
                value={"Public"}
                onChange={handleInputChange}
              />
              <label htmlFor="public">Public</label>
            </div>
            <div className="fieldset-group__item">
              <input
                type="radio"
                name="employment_type"
                id="emp-type__btn"
                value={"Private"}
                onChange={handleInputChange}
              />
              <label htmlFor="public">Private</label>
            </div>
            <div className="fieldset-group__item">
              <input
                type="radio"
                name="employment_type"
                id="emp-type__btn"
                value={"Home"}
                onChange={handleInputChange}
              />
              <label htmlFor="public">Home</label>
            </div>
            <div className="fieldset-group__item">
              <input
                type="radio"
                name="employment_type"
                id="emp-type__btn"
                value={"Other"}
                onChange={handleInputChange}
              />
              <label htmlFor="public">Other</label>
            </div>
          </fieldset>
        </div>

        <div className="register__form-group">
          <fieldset
            className="employment-region__fieldset-group"
            name="employment_region"
          >
            <legend>Employment Region</legend>
            <div className="fieldset-group__item">
              <input
                type="radio"
                name="employment_region"
                id=""
                value={"NYC"}
                onChange={handleInputChange}
              />
              <label htmlFor="region">NYC</label>
            </div>
            <div className="fieldset-group__item">
              <input
                type="radio"
                name="employment_region"
                id=""
                value={"Nassau"}
                onChange={handleInputChange}
              />
              <label htmlFor="region">Nassau</label>
            </div>
            <div className="fieldset-group__item">
              <input
                type="radio"
                name="employment_region"
                id=""
                value={"Suffolk"}
                onChange={handleInputChange}
              />
              <label htmlFor="region">Suffolk</label>
            </div>
          </fieldset>
        </div>

        <div className="register__form-group">
          <label htmlFor="grade-level">Select Grade Level:</label>
          <select
            name="grade-level"
            className="form-group__select"
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

        <div className="register__form-group">
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

        <div className="register__form-group">
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
          <button className="register__submit-btn" type="submit">
            Register
          </button>
        ) : (
          <Loading />
        )}
      </motion.form>
      <Link href="/" className="register__login-link">
        Already a member, Click here to login!
      </Link>
    </main>
  );
};

export default Register;
