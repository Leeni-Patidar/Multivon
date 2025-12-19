import { Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import Login from "./components/Login"
import ProtectedRoute from "./components/ProtectedRoute"
import AdminDashboard from "./pages/AdminDashboard"

export default function App() {
  return (
    <Routes>
      {/* Visitor default route */}
      <Route path="/" element={<Home />} />

      {/* Admin login */}
      <Route path="/login" element={<Login />} />

      {/* Admin protected route */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute>
            <AdminDashboard />
          </ProtectedRoute>
        }
      />
    </Routes>
  )
}
