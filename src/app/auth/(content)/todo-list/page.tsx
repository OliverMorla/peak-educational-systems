// Still work in progress!
"use client";
import { useState, useReducer, useEffect, useRef, createRef } from "react";
import { v4 as uuidv4 } from "uuid";
import { motion } from "framer-motion";
import { useSession } from "next-auth/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fadeEffect2, fadeEffectDelay2 } from "@/config/framer.config";
import {
  faArrowUpShortWide,
  faCheck,
  faPencilSquare,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import DigitalClock from "@/components/DigitalClock";

const todoReducer = (todos: Todo[], action: TodoReducerActionType) => {
  switch (action.type) {
    case "FETCH_TODOS":
      return action.payload;
      break;
    case "ADD_TODO":
      return [...todos, action.payload];
      break;
    case "DELETE_TODO":
      return todos.filter((todo) => todo.todo_id !== action.payload);
      break;
    case "EDIT_TODO":
      return todos.map((todo) => {
        if (todo.todo_id === action.payload.todo_id) {
          return {
            ...todo,
            todo_text: action.payload.todo_text,
          };
        } else {
          return { ...todo };
        }
      });
      break;
    case "MARK_TODO_AS_COMPLETED":
      return todos.map((todo) => {
        if (todo.todo_id === action.payload) {
          return {
            ...todo,
            todo_completed: true,
          };
        } else {
          return { ...todo };
        }
      });
      break;
    case "MARK_TODO_AS_UNCOMPLETED":
      return todos.map((todo) => {
        if (todo.todo_id === action.payload) {
          return {
            ...todo,
            todo_completed: false,
          };
        } else {
          return { ...todo };
        }
      });
      break;
    default:
      return todos;
      break;
  }
};

const TodoList = () => {
  const { data: session } = useSession();
  const todoInputRefs = useRef<HTMLInputElement[]>([]);
  const [todos, dispatch] = useReducer(todoReducer, []);
  const [todoEditText, setTodoEditText] = useState<string>("");
  const [todoEditID, setTodoEditID] = useState<number>();
  const [randomTodoID, setRandomTodoID] = useState<string>(uuidv4());
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [todoInput, setTodoInput] = useState<TodoInputs>({
    todo_id: randomTodoID,
    todo_completed: false,
    todo_text: "",
    created_at: new Date().toLocaleString(),
    updated_at: new Date().toLocaleString(),
    // @ts-ignore
    user_id: session?.user.id,
    isEditing: false,
  });

  console.log(todoEditID);
  console.log(todoEditText);

  const handleTodo = async (
    action: string,
    todo_id: number | string,
    todo_completed: boolean | undefined
  ) => {
    switch (action) {
      case "ADD_TODO":
        try {
          const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/auth/todo`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(todoInput),
            }
          );
          const data = await res.json();
          if (data.ok) {
            dispatch({
              type: action,
              payload: todoInput,
            });
          }
        } catch (err) {
          console.log(err instanceof Error ? err.message : "Network error");
        }
        break;
      case "DELETE_TODO":
        try {
          const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/auth/todo`,
            {
              method: "DELETE",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ todo_id }),
            }
          );
          const data = await res.json();
          if (data.ok) {
            dispatch({
              type: action,
              payload: todo_id,
            });
          }
        } catch (err) {
          console.log(err instanceof Error ? err.message : "Network error");
        }
        break;

      case "EDIT_TODO":
        try {
          const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/auth/todo`,
            {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ todo_id, todo_text: todoEditText }),
            }
          );
          const data = await res.json();
          if (data.ok) {
            const editedTodo = {
              todo_id,
              todo_text: todoEditText,
              todo_completed,
            };
            dispatch({
              type: action,
              payload: editedTodo,
            });
          }
        } catch (err) {
          console.log(err instanceof Error ? err.message : "Network error");
        }
        break;

      case "MARK_TODO_AS_COMPLETED":
        try {
          const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/auth/todo`,
            {
              method: "PATCH",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ todo_id, todo_completed }),
            }
          );
          const data = await res.json();
          if (data.ok) {
            dispatch({
              type: action,
              payload: todo_id,
            });
          }
        } catch (err) {
          console.log(err instanceof Error ? err.message : "Network error");
        }
        break;

      case "MARK_TODO_AS_UNCOMPLETED":
        try {
          const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/auth/todo`,
            {
              method: "PATCH",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ todo_id, todo_completed }),
            }
          );
          const data = await res.json();
          if (data.ok) {
            dispatch({
              type: action,
              payload: todo_id,
            });
          }
        } catch (err) {
          console.log(err instanceof Error ? err.message : "Network error");
        }
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/todo`);
        const data = await res.json();
        if (data.ok) {
          dispatch({
            type: "FETCH_TODOS",
            payload: data.todos,
          });
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Network error");
      }
    };
    fetchTodos();
  }, []);

  // console.log(todoInputRefs.current[8]?.value);
  // console.log(todoInputRefs);

  const toggleEdit = (todoEdit: Todo) => {
    const updatedTodos = todos.map((todo: Todo) =>
      todo.todo_id === todoEdit.todo_id
        ? { ...todo, isEditing: !todo.isEditing }
        : { ...todo, isEditing: false }
    );
    dispatch({ type: "FETCH_TODOS", payload: updatedTodos });
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
        className="flex w-full min-h-screen pt-[75px] items-center gap-3 flex-col pb-4"
      >
        <section>
          <DigitalClock />
        </section>
        <section>
          <h1 className="text-5xl font-bold tracking-tighter">
            Welcome to the&nbsp;
            <motion.span
              variants={fadeEffectDelay2}
              initial={"hidden"}
              animate={"visible"}
              className="text-[--primary] underline"
            >
              Todo List
            </motion.span>
          </h1>
        </section>
        <section className="flex flex-row items-center gap-2">
          <input
            type="text"
            name="todo_text"
            value={todoInput.todo_text}
            className=" pl-4 h-16 appearance-none border-b-2 border-slate-400 focus:outline-none focus:border-slate-700 transition-colors w-[400px]"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setTodoInput({ ...todoInput, [e.target.name]: e.target.value })
            }
            onKeyUp={(e: React.KeyboardEvent<HTMLInputElement>) => {
              if (e.key === "Enter") {
                const newUUID = uuidv4();
                setTodoInput((prevInput) => ({
                  ...prevInput,
                  todo_id: newUUID,
                  todo_text: "",
                }));
                handleTodo("ADD_TODO", todoInput.todo_id, undefined);
              }
            }}
            placeholder="Enter a task!"
          />
          <button
            className="bg-slate-600 h-16 w-16 appearance-none border-none hover:bg-slate-700 transition-colors text-red-200"
            onClick={() => {
              const newUUID = uuidv4();
              setTodoInput((prevInput) => ({
                ...prevInput,
                todo_id: newUUID,
              }));
              handleTodo("ADD_TODO", todoInput.todo_id, undefined);
            }}
          >
            Add
          </button>
        </section>
        <section className="h-auto">
          {todos?.length === 0 ? (
            <p className="flex justify-center items-center h-full p-4">
              You have no todos yet!
            </p>
          ) : (
            <section className="flex flex-col">
              <div className="flex">
                <button className="bg-slate-300 p-3 appearance-none border-none hover:bg-slate-400 transition-colors">
                  Date Sort <FontAwesomeIcon icon={faArrowUpShortWide} />
                </button>
                <button className="bg-[--matteRed] p-3 appearance-none border-none hover:bg-[--matteRed-hover] transition-colors text-[white]">
                  Delete All <FontAwesomeIcon icon={faTrash} />
                </button>
                <button className="bg-green-500 p-4 w-fit appearance-none border-none hover:bg-green-600 transition-colors">
                  Mark All as Completed <FontAwesomeIcon icon={faCheck} />
                </button>
              </div>

              <ul className="flex flex-col justify-between items-center mt-2">
                {todos?.map((todo: Todo) => (
                  <motion.li
                    variants={fadeEffectDelay2}
                    initial={"hidden"}
                    animate={"visible"}
                    className="flex flex-row items-center border-b-2 border-slate-600 pb-4 pt-4 gap-2 "
                    key={todo.todo_id}
                  >
                    <div className="flex">
                      {todo.isEditing ? (
                        <>
                          <input
                            type="text"
                            className="font-light bg-slate-200 h-[56px] w-[400px] text-center flex items-center justify-center transition-all hover:line-through"
                            value={todoEditText}
                            onKeyUp={(
                              e: React.KeyboardEvent<HTMLInputElement>
                            ) => {
                              if (e.key === "Enter") {
                                handleTodo(
                                  "EDIT_TODO",
                                  todo?.todo_id,
                                  todo?.todo_completed
                                );
                                setTodoEditText("");
                                toggleEdit(todo);
                              }
                            }}
                            onChange={(
                              e: React.ChangeEvent<HTMLInputElement>
                            ) => {
                              setTodoEditText(e.target.value);
                            }}
                            ref={(todoInputRef) =>
                              (todoInputRefs.current[todo.todo_id] =
                                todoInputRef as HTMLInputElement)
                            }
                            readOnly={false}
                          />
                        </>
                      ) : (
                        <>
                          <input
                            type="text"
                            className="font-light bg-slate-200 h-[56px] w-[400px] text-center flex items-center justify-center transition-all hover:line-through"
                            value={todo?.todo_text}
                            ref={(todoInputRef) =>
                              (todoInputRefs.current[todo.todo_id] =
                                todoInputRef as HTMLInputElement)
                            }
                            readOnly
                          />
                        </>
                      )}

                      <p className=" flex flex-col bg-slate-200 font-light h-[56px] text-center">
                        Created:
                        <span className="opacity-60">
                          {new Date(todo?.created_at).toLocaleString()}
                        </span>
                      </p>
                    </div>

                    <div className="flex gap-1">
                      <button
                        className="bg-[--matteRed] p-4 appearance-none border-none hover:bg-[--matteRed-hover] transition-colors"
                        onClick={() => {
                          handleTodo(
                            "DELETE_TODO",
                            todo?.todo_id,
                            todo?.todo_completed
                          );
                        }}
                      >
                        Delete <FontAwesomeIcon icon={faTrash} />
                      </button>
                      <button
                        className="bg-orange-500 p-4 appearance-none border-none hover:bg-orange-600 transition-colors"
                        onClick={() => toggleEdit(todo)}
                      >
                        {todo.isEditing ? "Save" : "Edit"}{" "}
                        <FontAwesomeIcon icon={faPencilSquare} />
                      </button>
                      <button
                        className="bg-green-500 p-4 w-fit appearance-none border-none hover:bg-green-600 transition-colors"
                        value={
                          todo?.todo_completed
                            ? "Completed"
                            : "Mark As Completed"
                        }
                        onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                          if (e.currentTarget.value === "Completed") {
                            handleTodo(
                              "MARK_TODO_AS_UNCOMPLETED",
                              todo?.todo_id,
                              todo?.todo_completed
                            );
                          } else {
                            handleTodo(
                              "MARK_TODO_AS_COMPLETED",
                              todo?.todo_id,
                              todo?.todo_completed
                            );
                          }
                        }}
                      >
                        {todo?.todo_completed
                          ? "Completed"
                          : "Mark As Completed"}{" "}
                        <FontAwesomeIcon icon={faCheck} />
                      </button>
                    </div>
                  </motion.li>
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
