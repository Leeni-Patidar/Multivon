import { useState, useEffect } from "react"
import { useNavigate, useLocation } from "react-router-dom"

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [showMenu, setShowMenu] = useState(false)
  const userInitial = "A" // replace later with dynamic name

  const navigate = useNavigate()
  const location = useLocation() // 👈 get current route

  // 🔹 Check login status on load
  useEffect(() => {
    const token = localStorage.getItem("token")
    setIsLoggedIn(!!token)
  }, [])

  const handleLogout = () => {
    localStorage.removeItem("token")
    setIsLoggedIn(false)
    setShowMenu(false)
    navigate("/") // 👈 visitor page
  }

  const handleLoginClick = () => {
    navigate("/login")
  }

  return (
    <>
      {/* Navbar */}
      <nav className="fixed top-0 left-0 w-full z-50 bg-white/80 backdrop-blur shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          
          {/* Logo */}
          <div
            className="text-2xl font-bold text-blue-950 cursor-pointer"
            onClick={() => navigate("/")}
          >
            Multivon
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8 font-medium">
            {/* Hide Home and About on /admin */}
            {location.pathname !== "/admin" && (
              <>
                <a href="#home" className="hover:text-blue-950">Home</a>
                <a href="#about" className="hover:text-blue-950">About</a>
              </>
            )}
            <a href="#projects" className="hover:text-blue-950">Projects</a>
            <a href="#testimonials" className="hover:text-blue-950">Testimonials</a>
          </div>

          {/* Auth Section */}
          <div className="hidden md:block relative">
            {!isLoggedIn ? (
              /* LOGIN */
              <button
                onClick={handleLoginClick}
                className="bg-blue-950 text-white px-5 py-2 rounded-md hover:bg-blue-700 transition"
              >
                Admin Login
              </button>
            ) : (
              /* PROFILE */
              <div>
                <button
                  onClick={() => setShowMenu(!showMenu)}
                  className="w-10 h-10 rounded-full bg-blue-950 text-white font-semibold flex items-center justify-center"
                >
                  {userInitial}
                </button>

                {showMenu && (
                  <div className="absolute right-0 mt-2 w-32 bg-white border rounded-md shadow-md">
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 hover:bg-gray-100 text-gray-700"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

        </div>
      </nav>

      {/* Spacer */}
      <div className="h-20"></div>
    </>
  )
}

export default Navbar
