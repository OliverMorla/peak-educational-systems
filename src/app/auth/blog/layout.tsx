import Loading from "@/app/loading";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "PES - Blog",
  description: "Create, read, update, and delete blog posts.",
  keywords: [
    "Blog",
    "Create",
    "Read",
    "Update",
    "Delete",
    "CRUD",
    "Posts",
    "Articles",
    "News",
    "Updates",
    "Information",
    "Data",
    "Content",
    "Blogging",
    "Blogs",
    "Writing",
    "Writers",
    "Authors",
    "Journalism",
    "Journalists",
    "Journal",
    "Journals",
    "Newspaper",
    "Newspapers",
    "Magazine",
    "Magazines",
    "Periodical",
    "Periodicals",
  ],
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Suspense fallback={<Loading />}>{children}</Suspense>
    </>
  );
}
