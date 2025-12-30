import Counter from "@/components/Counter";

export default function UserPage() {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">
        User Directory
      </h1>

      <div className="bg-white rounded-xl shadow-md p-6 w-[320px]">
        <p className="text-sm text-gray-600">
          <span className="font-semibold">Email:</span> —
        </p>
        <p className="text-sm text-gray-600 mt-1">
          <span className="font-semibold">Phone:</span> —
        </p>

        <Counter />
       
  <h1>{new Date().toLocaleTimeString()}</h1>;

      </div>
    </div>
  );
}
