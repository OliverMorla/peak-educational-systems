import { JWT } from "next-auth/jwt";

const isAdmin = (user: JWT | null): boolean => {
  return (
    user?.sub === process.env.ADMIN_ID && user?.role === process.env.ADMIN_ROLE
  );
};

export default isAdmin;
