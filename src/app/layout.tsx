import { Metadata } from "next";
import { Suspense } from "react";
import { Roboto } from "next/font/google";
import { AuthProvider } from "@/contexts/AuthContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Providers from "@/components/Auth";
import Loading from "./loading";
import "./globals.css";

const roboto = Roboto({
  weight: ["100", "300", "500", "900"],
  style: ["normal"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Peak Educational Systems",
  description: "Welcome to Peak Educational Systems. Here you can find all the information you need to know about our company and our services.",
  keywords: ["Student Consulting", "Teacher Consulting", "Parent Consulting"],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <html lang="en">
      <body className={roboto.className}>
        <AuthProvider>
          <Suspense fallback={<Loading />}>
            <Providers>
              <Header />
              {children}
              <Footer />
            </Providers>
          </Suspense>
        </AuthProvider>
      </body>
    </html>
  );
}
