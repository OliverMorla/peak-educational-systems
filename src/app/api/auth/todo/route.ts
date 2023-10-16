import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import prisma from "@/lib/prisma";

// Get all todos for a user
export async function GET(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.OAUTH_SECRET });

  if (token) {
    try {
      const todos = await prisma.todo.findMany({
        where: {
          user_id: Number(token?.sub),
        },
      });

      if (todos) {
        return NextResponse.json({
          status: 200,
          ok: true,
          todos: todos,
        });
      }
    } catch (err) {
      return NextResponse.json({
        status: 500,
        ok: false,
        message: "Failed to fetch todos!",
        prisma_error:
          err instanceof Error ? err.message : "An Internal Error Occurred!",
      });
    }
  }
}

// Create a todo for a user
export async function POST(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.OAUTH_SECRET });

  const body = await req.json();

  if (token) {
    if (body.todo_text !== "") {
      try {
        const todo = await prisma.todo.create({
          data: {
            todo_text: body.todo_text,
            todo_completed: false,
            user_id: Number(token?.sub),
          },
        });

        if (todo) {
          return NextResponse.json({
            status: 200,
            ok: true,
            message: "Todo created successfully!",
          });
        }
      } catch (err) {
        return NextResponse.json({
          status: 500,
          ok: false,
          message: "Failed to create todo!",
          prisma_error:
            err instanceof Error ? err.message : "An Internal Error Occurred!",
        });
      }
    }
  } else {
    return NextResponse.json({
      status: 401,
      ok: false,
      message: "Please login to create a todo!",
    });
  }
}

// Delete a todo for a user
export async function DELETE(req: NextRequest) {
  const authorizedUser = await getToken({
    req,
    secret: process.env.OAUTH_SECRET,
  });

  const body = await req.json();
  if (authorizedUser) {
    if (body.todo_id !== undefined || "") {
      try {
        const todo = await prisma.todo.delete({
          where: {
            todo_id: body.todo_id,
          },
        });

        if (todo) {
          return NextResponse.json({
            ok: true,
            status: 200,
            message: "Todo deleted successfully!",
          });
        }
      } catch (err) {
        return NextResponse.json({
          status: 500,
          ok: false,
          message: "Failed to delete todo!",
          prisma_error:
            err instanceof Error ? err.message : "An Internal Error Occurred!",
        });
      }
    }
  }
}

// Update a todo for a user
export async function PUT(req: NextRequest) {
  const authorizedUser = await getToken({
    req,
    secret: process.env.OAUTH_SECRET,
  });

  const body = await req.json();

  if (authorizedUser) {
    if (body.todo_id !== undefined && body.todo_text !== "") {
      try {
        const todo = await prisma.todo.update({
          where: {
            todo_id: body.todo_id,
          },
          data: {
            todo_text: body.todo_text,
          },
        });

        if (todo) {
          return NextResponse.json({
            ok: true,
            status: 200,
            message: "Todo updated successfully!",
          });
        }
      } catch (err) {
        return NextResponse.json({
          status: 500,
          ok: false,
          message: "Failed to update todo!",
          prisma_error:
            err instanceof Error ? err.message : "An Internal Error Occurred!",
        });
      }
    } else if (body.markAllTodosCompleted) {
      try {
        const todo = await prisma.todo.updateMany({
          where: {
            todo_completed: false,
          },
          data: {
            todo_completed: true,
          },
        });

        if (todo) {
          return NextResponse.json({
            ok: true,
            status: 200,
            message: "Todo updated successfully!",
          });
        }
      } catch (err) {
        return NextResponse.json({
          status: 500,
          ok: false,
          message: "Failed to update todo!",
          prisma_error:
            err instanceof Error ? err.message : "An Internal Error Occurred!",
        });
      }
    } else if (body.deleteAllTodos) {
      try {
        const todo = await prisma.todo.deleteMany({});

        if (todo) {
          return NextResponse.json({
            ok: true,
            status: 200,
            message: "Todo updated successfully!",
          });
        }
      } catch (err) {
        return NextResponse.json({
          status: 500,
          ok: false,
          message: "Failed to update todo!",
          prisma_error:
            err instanceof Error ? err.message : "An Internal Error Occurred!",
        });
      }
    }
  }
}

// Toggle a todo for a user
export async function PATCH(req: NextRequest) {
  const authorizedUser = await getToken({
    req,
    secret: process.env.OAUTH_SECRET,
  });

  const body = await req.json();

  if (authorizedUser) {
    if (body.todo_id !== undefined || "") {
      if (body.todo_completed === true) {
        try {
          const todo = await prisma.todo.update({
            where: {
              todo_id: body.todo_id,
            },
            data: {
              todo_completed: false,
            },
          });

          if (todo) {
            return NextResponse.json({
              ok: true,
              status: 200,
              message: "Todo updated successfully!",
            });
          }
        } catch (err) {
          return NextResponse.json({
            status: 500,
            ok: false,
            message: "Failed to update todo!",
            prisma_error:
              err instanceof Error
                ? err.message
                : "An Internal Error Occurred!",
          });
        }
      } else {
        try {
          const todo = await prisma.todo.update({
            where: {
              todo_id: body.todo_id,
            },
            data: {
              todo_completed: true,
            },
          });

          if (todo) {
            return NextResponse.json({
              ok: true,
              status: 200,
              message: "Todo updated successfully!",
            });
          }
        } catch (err) {
          return NextResponse.json({
            status: 500,
            ok: false,
            message: "Failed to update todo!",
            prisma_error:
              err instanceof Error
                ? err.message
                : "An Internal Error Occurred!",
          });
        }
      }
    }
  }
}
