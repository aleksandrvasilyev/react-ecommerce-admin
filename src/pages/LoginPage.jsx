import { useState } from "react";
// import axios from "axios";
import { useAuth } from "../context/AuthContext";

const LoginPage = () => {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    await login(email, password);
  };

  return (
    <>
      <div className="w-full max-w-md mx-auto bg-white border border-gray-200 rounded-md shadow-sm m-6  p-10">
        <div className="bg-white text-center text-2xl">Login</div>
        <form onSubmit={handleSubmit}>
          <label className="block text-sm mb-2 mt-8" htmlFor="email">
            Email
          </label>
          <input
            onChange={(e) => setEmail(e.target.value)}
            className="py-3 px-4 block w-full border border-gray-300 rounded-lg text-sm focus:border-gray-500"
            type="text"
            placeholder="email"
            name="email"
            id="email"
          ></input>
          <label className="block text-sm mb-2 mt-8" htmlFor="password">
            Password
          </label>
          <input
            onChange={(e) => setPassword(e.target.value)}
            className="py-3 px-4 block w-full border border-gray-300 rounded-lg text-sm focus:border-gray-500"
            type="password"
            placeholder="password"
            name="password"
            id="password"
          ></input>
          <button
            type="submit"
            className="w-full py-3 px-4 mt-8 bg-sky-500 text-white hover:bg-sky-600 border rounded-lg"
          >
            Login
          </button>
        </form>
      </div>
    </>
  );
};

export default LoginPage;
