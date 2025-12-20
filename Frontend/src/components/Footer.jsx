import { useState } from "react"
import axios from "axios"
import {
  FaTwitter,
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa"

const Footer = () => {
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubscribe = async () => {
    // 🔍 Basic email validation
    if (!email) {
      setMessage("Please enter an email address")
      return
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      setMessage("Please enter a valid email address")
      return
    }

    try {
      setLoading(true)
      setMessage("")

      const res = await api.post("/subscriber", { email }
      )

      setMessage(res.data.message || "Subscribed successfully 🎉")
      setEmail("")
    } catch (error) {
      // 🚫 Duplicate subscription handling
      if (error.response?.status === 409) {
        setMessage("This email is already subscribed ❗")
      } else {
        setMessage(
          error.response?.data?.message ||
            "Subscription failed. Please try again."
        )
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <footer className="w-full">
    

      {/* Blue Navigation Strip */}
      <div className="bg-blue-950">
        <div className=" py-16 px-4">
  <div className="max-w-4xl mx-auto text-center">
    <h2 className="text-3xl md:text-4xl font-bold text-white">
      Subscribe to our Newsletter
    </h2>

    <p className="text-gray-400 mt-4">
      Stay updated with our latest projects and offers.
    </p>

    <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
      <input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full sm:w-[380px] px-5 py-3 rounded-lg bg-[#0b1220] border border-gray-700 text-white outline-none focus:border-blue-500"
      />

      <button
        onClick={handleSubscribe}
        disabled={loading}
        className="px-8 py-3 rounded-lg bg-blue-500 text-white font-semibold hover:bg-blue-600 transition disabled:opacity-60"
      >
        {loading ? "Subscribing..." : "Subscribe"}
      </button>
    </div>

    {message && (
      <p className="mt-3 text-sm text-gray-300">
        {message}
      </p>
    )}
  </div>
</div>
      </div>

      {/* Bottom Dark Bar */}
      <div className="bg-gray-900 text-gray-400 text-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <p>© {new Date().getFullYear()} Multivon. All Rights Reserved.</p>

          <div className="flex gap-4 text-lg">
            <FaTwitter className="hover:text-white cursor-pointer" />
            <FaFacebookF className="hover:text-white cursor-pointer" />
            <FaInstagram className="hover:text-white cursor-pointer" />
            <FaLinkedinIn className="hover:text-white cursor-pointer" />
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
