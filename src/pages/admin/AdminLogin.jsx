import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AdminLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await axios.post("http://localhost:8000/api/admin/login", {
        username,
        password,
      });

      // Save token in localStorage
      localStorage.setItem("adminToken", res.data.token);

      // Redirect to admin dashboard
      navigate("/admin/dashboard");
    } catch (err) {
      setError(
        err.response?.data?.message || "Login failed. Please try again."
      );
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 mt-20 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-6 text-center">Admin Login</h1>
      {error && (
        <div className="bg-red-100 text-red-700 p-3 mb-4 rounded">{error}</div>
      )}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-semibold">Username</label>
          <input
            type="text"
            className="w-full border p-2 rounded"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            autoFocus
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold">Password</label>
          <input
            type="password"
            className="w-full border p-2 rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-orange-500 text-white py-2 rounded hover:bg-orange-600 transition"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default AdminLogin;
