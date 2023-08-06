import { Metadata } from "next";

export const metadata: Metadata = {
  title: "PES - Auth",
  description: "Sign in, sign up or manage your account!",
  keywords: [
    "Auth",
    "Sign In",
    "Sign Up",
    "Sign Out",
    "Log In",
    "Log Out",
    "Manage",
    "Account",
    "Accounts",
    "User",
    "Users",
    "User Account",
    "User Accounts",
    "User Management",
    "User Accounts Management",
    "User Account Management",
    "User Accounts Management",
    "User Authentication",
    "User Authentication Management",
    "User Authentication Management",
    "User Authentication Management",
    "User Authentication",
  ],
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
