import { useState, useEffect } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import { FaBars, FaTimes } from "react-icons/fa"

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [showMenu, setShowMenu] = useState(false)
  const [mobileMenu, setMobileMenu] = useState(false)

  const userInitial = "A"
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    const token = localStorage.getItem("token")
    setIsLoggedIn(!!token)
  }, [])

  const handleLogout = () => {
    localStorage.removeItem("token")
    setIsLoggedIn(false)
    setMobileMenu(false)
    navigate("/")
  }

  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-50 bg-white/80 backdrop-blur shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

          {/* Logo */}
          <div
            className="text-2xl font-bold text-blue-950 cursor-pointer"
            onClick={() => {
              navigate("/")
              setMobileMenu(false)
            }}
          >
            Multivon
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8 font-medium">
            {location.pathname !== "/admin" && (
              <>
                <a href="#home" className="hover:text-blue-950">Home</a>
                <a href="#about" className="hover:text-blue-950">About</a>
              </>
            )}
            <a href="#projects" className="hover:text-blue-950">Projects</a>
            <a href="#testimonials" className="hover:text-blue-950">Testimonials</a>
          </div>

          {/* Desktop Auth */}
          <div className="hidden md:block relative">
            {!isLoggedIn ? (
              <button
                onClick={() => navigate("/login")}
                className="bg-blue-950 text-white px-5 py-2 rounded-md hover:bg-blue-700 transition"
              >
                Admin Login
              </button>
            ) : (
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

          {/* Mobile Hamburger */}
          <button
            className="md:hidden text-2xl text-blue-950"
            onClick={() => setMobileMenu(!mobileMenu)}
          >
            {mobileMenu ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenu && (
          <div className="md:hidden bg-white border-t shadow-lg">
            <div className="px-6 py-4 flex flex-col space-y-4 font-medium">

              {location.pathname !== "/admin" && (
                <>
                  <a href="#home" onClick={() => setMobileMenu(false)}>Home</a>
                  <a href="#about" onClick={() => setMobileMenu(false)}>About</a>
                </>
              )}

              <a href="#projects" onClick={() => setMobileMenu(false)}>Projects</a>
              <a href="#testimonials" onClick={() => setMobileMenu(false)}>Testimonials</a>

              <hr />

              {!isLoggedIn ? (
                <button
                  onClick={() => {
                    navigate("/login")
                    setMobileMenu(false)
                  }}
                  className="bg-blue-950 text-white px-4 py-2 rounded-md"
                >
                  Admin Login
                </button>
              ) : (
                <button
                  onClick={handleLogout}
                  className="text-left text-red-600"
                >
                  Logout
                </button>
              )}
            </div>
          </div>
        )}
      </nav>

      {/* Spacer */}
      <div className="h-20"></div>
    </>
  )
}

export default Navbar