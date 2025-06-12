import { useState } from "react";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!username || !password) {
      setError("Username dan password wajib diisi.");
    } else {
      setError("");
      console.log("Login Data:", { username, password });
      // Bisa tambahkan Axios untuk kirim ke backend di sini
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-beige-100 bg-[#f5f5dc] px-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6 md:p-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-6 text-center">
          Login
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-[#32620e] focus:border-[#32620e] sm:text-sm"
              placeholder="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-[#32620e] focus:border-[#32620e] sm:text-sm"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-[#32620e] hover:bg-[#498913] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#32620e]"
          >
            Login
          </button>

          <p className="text-sm text-center text-gray-500">
            Don't have an account?{" "}
            <a
              href="/register"
              className="font-medium text-[#32620e] hover:underline"
            >
              Register here
            </a>
          </p>

          {error && <p className="text-sm text-red-500 text-center">{error}</p>}
        </form>
      </div>
    </div>
  );
}
