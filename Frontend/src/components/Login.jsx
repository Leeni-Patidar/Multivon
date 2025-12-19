import { useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post("/admin/login", { email, password });
      localStorage.setItem("token", res.data.token);
      navigate("/admin");
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
      console.error(err);
    }
  };

  return (
    <div
      className="min-h-screen w-screen flex items-center justify-center bg-cover bg-center bg-no-repeat bg-fixed"
      
    >
      <div className="w-full max-w-md">
        <div className="bg-white/20 backdrop-blur-lg border border-white/30 rounded-2xl p-8 md:p-10 shadow-xl">
          <div className="text-center mb-6">
            <h2 className="text-3xl font-bold mb-2">Admin Login</h2>
            <p>Login to your account</p>
          </div>

          <form onSubmit={submitHandler}>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Email</label>
              <input
                type="email"
                autoComplete="email"
                className="w-full border-2 border-black rounded-lg px-4 py-3 bg-transparent focus:bg-transparent focus:shadow-[0_0_0_4px_rgba(147,197,253,0.35)] transition-shadow duration-200"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="mb-4 relative">
              <label className="block text-sm font-medium mb-1">Password</label>
              <input
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                className="w-full border-2 border-black rounded-lg px-4 py-3 pr-10 bg-transparent"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-3 flex items-center top-3"
                tabIndex={-1}
              >
                {showPassword ? <AiOutlineEye size={20} /> : <AiOutlineEyeInvisible size={20} />}
              </button>
            </div>

            <button className="w-full bg-[#13338d] hover:bg-[#81a2da] text-white py-3 rounded-lg transition-all duration-300">
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
