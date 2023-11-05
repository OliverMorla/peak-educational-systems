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
  return response.json() as Promise<UserProfileResponse>;
};

export default async function UserProfile({
  params,
}: {
  params: UserProfileParams;
}) {
  const { user } = await getUser(params.user_id);
  return (
    <main className="w-full flex h-screen items-center justify-center flex-col">
      <h1 className="text-3xl font-bold text-[--matteBlack] pt-20">
        User Profile
      </h1>
      <section className="w-full flex items-center justify-center flex-col">
        <div className="flex gap-2">
          <span className="font-bold">Name:</span>
          <span className="text-[--matteBlack]">
            {user.first_name} {user.last_name}
          </span>
        </div>
        <div className="flex gap-2">
          <span className="font-bold">Role:</span>
          <span className="text-[--matteBlack]">{user.role}</span>
        </div>
        <div className="flex gap-2">
          <span className="font-bold">Employee type:</span>
          <span className="text-[--matteBlack]">{user.employment_type}</span>
        </div>
        <div className="flex gap-2">
          <span className="font-bold">Employee Region:</span>
          <span className="text-[--matteBlack]">{user.employment_region}</span>
        </div>
        <div className="flex gap-2">
          <span className="font-bold">Child Grade Level:</span>
          <span className="text-[--matteBlack]">{user.child_grade_level}</span>
        </div>
        <div className="flex gap-2">
          <span className="font-bold">School Type:</span>
          <span className="text-[--matteBlack]">{user.school_type}</span>
        </div>
        <div className="flex gap-2">
          <span className="font-bold">School Region:</span>
          <span className="text-[--matteBlack]">{user.school_region}</span>
        </div>
        <div className="flex gap-2">
          <span className="font-bold">Been a member since:</span>
          <span className="text-[--matteBlack]">
            {new Date(user.created_at).toDateString()}
          </span>
        </div>
      </section>
    </main>
  );
}
