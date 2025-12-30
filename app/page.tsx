type User = {
  id: number;
  name: string;
  email: string;
};

async function getUsers(): Promise<User[]> {
  const res = await fetch(
    "https://jsonplaceholder.typicode.com/users"
  );
  return res.json();
}

export default async function HomePage() {
  const users = await getUsers();

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {users.map(user => (
        <a
          key={user.id}
          href={`/users/${user.id}`}
          className="bg-white p-4 rounded shadow hover:shadow-md transition"
        >
          <h2 className="font-semibold">{user.name}</h2>
          <p className="text-sm text-gray-600">{user.email}</p>
        </a>
      ))}
    </div>
  );
}
