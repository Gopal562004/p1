import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { registerUser, loginUser } from "../api/services";
import { Link, useNavigate } from "react-router-dom";

const AuthForm = ({ type }) => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload =
        type === "login"
          ? { email: formData.email, password: formData.password }
          : formData;
      const data =
        type === "login"
          ? await loginUser(payload)
          : await registerUser(payload);
      login(data);
      navigate("/dashboard");
    } catch (err) {
      setMessage(err.response?.data?.message || "Error occurred");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-6 border rounded shadow">
      <h2 className="text-2xl font-bold mb-4">
        {type === "login" ? "Login" : "Register"}
      </h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        {type === "register" && (
          <input
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            className="border p-2 rounded"
            required
          />
        )}
        <input
          name="email"
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          {type === "login" ? "Login" : "Register"}
        </button>
      </form>
      <p className="mt-3 text-sm">
        {type === "login" ? (
          <Link to="/register" className="text-blue-500">
            Create account
          </Link>
        ) : (
          <Link to="/" className="text-blue-500">
            Already have an account?
          </Link>
        )}
      </p>
      {message && <p className="mt-3 text-red-500">{message}</p>}
    </div>
  );
};

export default AuthForm;
