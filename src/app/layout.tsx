import { Roboto } from "next/font/google";
import { Metadata } from "next";
import "./globals.css";
import Header from "@/components/header";
import Footer from "@/components/footer";

const roboto = Roboto({
  weight: ["100", "300", "500", "900"],
  style: "normal",
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
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}