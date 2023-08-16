import { Roboto } from "next/font/google";
import { Metadata } from "next";
import Header from "@/components/header";
import Footer from "@/components/footer";
import "./globals.css";
import Providers from "@/components/auth/provider";
import { AuthProvider } from "@/contexts/AuthContext";

const roboto = Roboto({
  weight: ["100", "300", "500", "900"],
  style: "normal",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Peak Educational Systems",
  description:
    "Welcome to Peak Educational Systems. Here you can find all the information you need to know about our company and our services.",
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
          <Providers>
            <Header />
            {children}
            <Footer />
          </Providers>
        </AuthProvider>
      </body>
    </html>
  );
}
