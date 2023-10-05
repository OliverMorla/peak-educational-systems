"use client";
import Link from "next/link";
import { useState } from "react";
import { useSearchParams } from "next/navigation"
const Category = ({ name, count }: { name: string; count: string }) => {
  
  const searchParams = useSearchParams();
  // @ts-ignore
  const category = searchParams.get("category");
  return (
    <Link href={`/auth/blog?category=${name}`}>
      <div className="categories__input">
        <input
          type="checkbox"
          name={name}
          className="category__input"
          checked={category === name ? true : false}
        />
        <label htmlFor={name}>
          {name} ({count})
        </label>
      </div>
    </Link>
  );
};

export default Category;
