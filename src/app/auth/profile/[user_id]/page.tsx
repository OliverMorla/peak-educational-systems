// import "./page.scss";

type UserProfileParams = {
  user_id: string;
};

const getUser = async (id: string) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/auth/profile/${id}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      next: {
        revalidate: 3600,
      },
    }
  );
  return response.json();
};

export default async function UserProfile({
  params,
}: {
  params: UserProfileParams;
}) {
  const user = await getUser(params.user_id);
  return (
    <main className="w-full flex h-screen items-center justify-center">
      <h1 className="text-3xl font-bold underline text-slate-500 pt-20">User Profile</h1>
    </main>
  );
}
