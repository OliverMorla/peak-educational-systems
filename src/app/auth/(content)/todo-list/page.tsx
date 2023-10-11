// Still work in progress!
"use client";
import { useState, useReducer } from "react";
import { useSession } from "next-auth/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { motion } from "framer-motion";
import {
  faArrowUpShortWide,
  faCheck,
  faPencilSquare,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { fadeEffect2, fadeEffectDelay2 } from "@/config/framer.config";

const TodoList = () => {
  const TestTodo: Todo = {
    created_at: "July 10, 2021",
    todo_completed: false,
    todo_text: "Go to school!",
    todo_id: 1,
    user_id: 1,
    user_name: "Sydney",
    updated_at: "July 10, 2021",
    user_profile_photo: "https://picsum.photos/200/300",
  };
  const { data: session } = useSession();
  const [todos, setTodos] = useState<any>([TestTodo]);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const todoReducer = async (state: any, action: any) => {
    switch (action.type) {
      case "ADD_TODO":
        const res = await fetch("");
        return [...state, action.payload];
      case "DELETE_TODO":
        return state.filter((todo: any) => todo.id !== action.payload);
      case "UPDATE_TODO":
        return state.map((todo: any) =>
          todo.id === action.payload.id ? action.payload : todo
        );
      default:
        return state;
    }
  };
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
      <motion.main
        variants={fadeEffect2}
        initial={"hidden"}
        animate={"visible"}
        className="flex w-full h-full pt-[75px] justify-center items-center gap-3 flex-col"
      >
        <section>
          <h1>Digital Time</h1>
        </section>
        <section>
          <h1 className="text-5xl font-bold tracking-tighter">
            Welcome to the <motion.span 
            variants={fadeEffectDelay2}
            initial={"hidden"}
            animate={"visible"}
            className="text-[--primary] underline">Todo List</motion.span>
          </h1>
        </section>
        <section className="flex flex-row items-center gap-2">
          <input
            type="text"
            name="todo-input"
            className=" pl-4 h-16 appearance-none border-b-2 border-slate-400 w-full focus:outline-none focus:border-slate-700 transition-colors w-[400px]"
            placeholder="Enter a task!"
          />
          <button className="bg-slate-600 h-16 w-16 appearance-none border-none hover:bg-slate-700 transition-colors text-red-200">
            Add
          </button>
        </section>
        <section className="h-auto">
          {todos.length === 0 ? (
            <p className="flex justify-center items-center h-full p-4">
              You have no todos yet!
            </p>
          ) : (
            <section className="flex flex-col">
              <div className="flex">
                <button className="bg-slate-300 p-3 appearance-none border-none hover:bg-slate-400 transition-colors">
                  Date Sort <FontAwesomeIcon icon={faArrowUpShortWide} />
                </button>
                <button className="bg-[--matteRed] p-3 appearance-none border-none hover:bg-[--matteRed:hover] transition-colors text-[white]">
                  Delete All <FontAwesomeIcon icon={faTrash} />
                </button>
                <button className="bg-green-500 p-4 w-fit appearance-none border-none hover:bg-green-600 transition-colors">
                  Mark All as Completed <FontAwesomeIcon icon={faCheck} />
                </button>
              </div>

              <ul className="flex flex-row justify-between items-center mt-2">
                {todos?.map((todo: Todo) => (
                  <li
                    className="flex flex-row items-center border-b-2 border-slate-600 pb-4 gap-2"
                    key={todo.todo_id}
                  >
                    <div className="flex">
                      <p className="font-light bg-slate-200 h-[56px] w-[400px] text-center flex items-center justify-center">
                        {todo?.todo_text}
                      </p>
                      <p className=" flex flex-col bg-slate-200 font-light h-[56px] text-center">
                        Created:
                        <span className="opacity-60">{todo?.created_at}</span>
                      </p>
                    </div>

                    <div className="flex gap-1">
                      <button className="bg-[--matteRed] p-4 appearance-none border-none hover:bg-[--matteRed-hover] transition-colors">
                        Delete <FontAwesomeIcon icon={faTrash} />
                      </button>
                      <button className="bg-orange-500 p-4 appearance-none border-none hover:bg-orange-600 transition-colors">
                        Edit <FontAwesomeIcon icon={faPencilSquare} />
                      </button>
                      <button className="bg-green-500 p-4 w-fit appearance-none border-none hover:bg-green-600 transition-colors">
                        Mark as Completed <FontAwesomeIcon icon={faCheck} />
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </section>
      </motion.main>
    );
  }
};

export default TodoList;
