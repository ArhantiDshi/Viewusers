"use client";

import { useState } from "react";

export default function Counter() {
  const [count, setCount] = useState(0);

  return (
    <button
      onClick={() => setCount(count + 1)}
      className="mt-4 w-full rounded-lg bg-blue-600 px-4 py-2 text-white font-medium
                 hover:bg-blue-700 transition"
    >
      Clicked {count} times
    </button>
  );
}
