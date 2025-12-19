import { useState } from "react"
import api from "../api/axios" 

const ConsultationForm = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    mobile: "",
    city: "",
  })

  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState(null)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setMessage(null)

    try {
      const response = await api.post("/contact", formData) 
      setMessage({ type: "success", text: response.data.message })
      setFormData({ fullName: "", email: "", mobile: "", city: "" })
    } catch (error) {
      setMessage({
        type: "error",
        text:
          error.response?.data?.message ||
          "Something went wrong. Please try again.",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="backdrop-blur-xl bg-white/20 border border-white/30 rounded-xl p-6 shadow-2xl">
      <h3 className="text-xl font-semibold text-white mb-4">
        Get a Free Consultation
      </h3>

      <form className="space-y-4" onSubmit={handleSubmit}>
        <input
          type="text"
          name="fullName"
          placeholder="Full Name"
          value={formData.fullName}
          onChange={handleChange}
          className="w-full px-4 py-2 rounded-md bg-white/70 text-black placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={handleChange}
          className="w-full px-4 py-2 rounded-md bg-white/70 text-black placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />

        <input
          type="text"
          name="mobile"
          placeholder="Phone Number"
          value={formData.mobile}
          onChange={handleChange}
          className="w-full px-4 py-2 rounded-md bg-white/70 text-black placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />

        <input
          name="city"
          placeholder="Area, City"
          value={formData.city}
          onChange={handleChange}
          className="w-full px-4 py-2 rounded-md bg-white/70 text-black placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        ></input>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-950 hover:bg-blue-700 text-white py-2 rounded-md font-semibold transition disabled:opacity-50"
        >
          {loading ? "Submitting..." : "Submit"}
        </button>

        {message && (
          <p
            className={`mt-2 text-center ${
              message.type === "success" ? "text-green-500" : "text-red-500"
            }`}
          >
            {message.text}
          </p>
        )}
      </form>
    </div>
  )
}

export default ConsultationForm
