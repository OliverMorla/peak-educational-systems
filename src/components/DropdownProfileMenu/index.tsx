import { fadeEffect } from "@/config/framer.config";
import { motion } from "framer-motion";

import Link from "next/link";
const DropdownProfileMenu = () => {
  return (
    <motion.aside
      variants={fadeEffect}
      initial="hidden"
      animate="visible"
      className="flex absolute bg-[--senary] flex-col w-full left-0 mt-4"
    >
      <ul>
        <Link href={"/auth/dashboard"}>
          <li className="p-4 hover:bg-slate-900 transition-colors">
            Dashboard
          </li>
        </Link>
        <Link href={"/auth/todo"}>
          <li className="p-4 hover:bg-slate-900 transition-colors">
            Todo-List
          </li>
        </Link>
      </ul>
    </motion.aside>
  );
};

export default DropdownProfileMenu;
