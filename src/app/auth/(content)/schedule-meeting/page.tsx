"use client";
import { InlineWidget } from "react-calendly";
import { useSession } from "next-auth/react";
import Link from "next/link";
const Schedule = () => {
  const { data: session } = useSession();
  if (!session?.user) {
    return (
      <main className="error">
        <h1 className="font-bold text-2xl">You have to sign in!</h1>
        <p>
          Please login in order to view this page. If you do not have an
          account, please sign up.
        </p>
        <Link href={"/register"}>Click here to sign up!</Link>
      </main>
    );
  } else {
    return (
      <main className="flex w-full pt-[75px] justify-center items-center min-h-screen">
        <InlineWidget
          url="https://calendly.com/peakeducationalsystems"
          styles={{
            height: "100%",
            width: "100%",
          }}
        />
      </main>
    );
  }
};

export default Schedule;
