"use client";

import { useSession, signOut } from "next-auth/react";
import { useState } from "react";
import Link from "next/link";
import "./page.scss";

const Dashboard: React.FunctionComponent = (): JSX.Element => {
  const [user, setUser] = useState<User>();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const { status, data: session } = useSession();

  const getUser = async () => {
    try {
      const res = await fetch(
        // @ts-ignorets-ignore
        `${process.env.NEXT_PUBLIC_CLIENT_URL}/api/auth/user/${session?.user?.id}`
      );
      const data = await res.json();
      if (data.user) setUser(data.user);
    } catch (err) {
      console.log(err);
    }
  };

  const deleteAcc = async (id: string | number | undefined) => {
    try {
      console.log("Account deleted");
    } catch (err) {
      console.log("Failed to delete account");
    }
  };

  if (status === "unauthenticated" || status === "loading") {
    return (
      <main className="error">
        <h1>You have to sign in!</h1>
        <p>
          Please login in order to view this page. If you do not have an
          account, please sign up.
        </p>
        <Link href={"/register"}>Click here to sign up!</Link>
      </main>
    );
  } else {
    getUser();
    return (
      <main className="profile__dashboard">
        <h1> Dashboard page </h1>
        <section className="dashboard__modal">
          <div className="modal__content">
            <ul>
              <li>
                <span>Name:</span>
                {user?.first_name}
              </li>
              <li>
                <span>Email:</span>
                {user?.email}
              </li>
              <li>
                <span>Password:</span>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password-hidden"
                  id="password-hidden"
                  value={user?.password}
                  readOnly
                />
                <input
                  type="checkbox"
                  name="password-visible"
                  id="password-visible"
                  onClick={() => setShowPassword(!showPassword)}
                />
              </li>
              <li>
                <span>Date of Birth:</span>
                {user?.date_of_birth}
              </li>
              <li>
                <span>Title:</span>
                {user?.title}
              </li>
              <li>
                <span>Employment Type:</span>
                {user?.emp_type}
              </li>
              <li>
                <span>Employment Region:</span>
                {user?.emp_region}
              </li>
              <li>
                <span>Child Grade Level:</span>
                {user?.child_grade_level}
              </li>
              <li>
                <span>School Type:</span>
                {user?.school_type}
              </li>
              <li>
                <span>School Region:</span>
                {user?.school_region}
              </li>
            </ul>
          </div>
          <aside className="modal__buttons">
            <button className="btn edit-acc">Edit Account</button>
            <button
              className="btn delete-acc"
              onClick={() => deleteAcc(user?.id)}
            >
              Delete Account
            </button>
            <button className="btn logout" onClick={() => signOut()}>
              Log Out
            </button>
          </aside>
        </section>
      </main>
    );
  }
};

export default Dashboard;
