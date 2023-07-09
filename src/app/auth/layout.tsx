import { Metadata } from "next";

export const metadata: Metadata = {
  title: "PES - Auth",
  description: "Login, Register and Manage your account.",
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
