"use client";

import { useSession, signOut } from "next-auth/react";
import Image from "next/image";
import { useEffect, useState } from "react";
import Link from "next/link";
import "./page.scss";

const Dashboard: React.FunctionComponent = (): JSX.Element => {
  const defaultUser = "/assets/icons/user-solid.svg";
  const [user, setUser] = useState<User>();
  const [error, setError] = useState<string>("");
  const [userAvatar, setUserAvatar] = useState<string>(defaultUser);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const { status, data: session } = useSession();

  const getUser = async () => {
    try {
      // @ts-ignorets-ignore
      if (session?.user?.id) {
        const res = await fetch(
          // @ts-ignorets-ignore
          `${process.env.NEXT_PUBLIC_CLIENT_URL}/api/auth/user/${session?.user?.id}`
        );
        const data = await res.json();
        if (data.user) {
          setUser(data.user);
        }
        throw new Error("User not found!");
      } else {
        throw new Error("You have to sign in!");
      }
    } catch (err) {
      if (err instanceof Error) console.log(err.message);
    }
  };

  useEffect(() => {
    getUser();
    console.log("UseEffect ran!");

    return () => undefined;
    // @ts-ignorets-ignore
  }, [session?.user?.id]);

  const deleteAcc = async (id: string | number | undefined) => {
    try {
      alert("Account Deleted!");
    } catch (err) {
      if (err instanceof Error) alert(err.message);
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
    return (
      <main className="profile__dashboard">
        <h1> Dashboard page </h1>
        <section className="profile__dashboard-modal">
          <div className="modal__content">
            <ul>
              <li>
                <span>Avatar:</span>
                <div className="flex items-end gap-2">
                  <Image
                    src={userAvatar}
                    width={128}
                    height={128}
                    alt="avatar.png"
                  />
                  <button className="bg-amber-700 p-2 cursor-pointer border-none hover:bg-amber-800 text-cyan-50 transition-colors ">
                    Update Photo
                  </button>
                  <input type="file" className="cursor-pointer appearance-none"/>
                </div>
              </li>
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
                {/* <input
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
                /> */}
              </li>
              <li>
                <span>Date of Birth:</span>
                {user?.date_of_birth}
              </li>
              <li>
                <span>Role:</span>
                {user?.role}
              </li>
              <li>
                <span>Title:</span>
                {user?.title}
              </li>
              <li>
                <span>Employment Type:</span>
                {user?.employment_type}
              </li>
              <li>
                <span>Employment Region:</span>
                {user?.employment_region}
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
