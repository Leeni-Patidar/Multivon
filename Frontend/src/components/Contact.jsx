"use client"

import { useState } from "react"

const ConsultationForm = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    mobile: "",
    city: "",
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("Form submitted:", formData)
    // Add your form submission logic here
  }

  return (
    <div className="w-full max-w-md mx-auto bg-slate-600 rounded-2xl shadow-[8px_8px_16px_rgba(0,0,0,0.3)] p-8">
      <h2 className="text-white text-3xl font-bold text-center mb-8">
        Get a Free
        <br />
        Consultation
      </h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            placeholder="Full Name"
            required
            className="w-full px-5 py-4 bg-transparent border-2 border-white/30 rounded-xl text-white placeholder:text-white/70 focus:outline-none focus:border-white/50 transition-colors"
          />
        </div>

        <div>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter Email Address"
            required
            className="w-full px-5 py-4 bg-transparent border-2 border-white/30 rounded-xl text-white placeholder:text-white/70 focus:outline-none focus:border-white/50 transition-colors"
          />
        </div>

        <div>
          <input
            type="tel"
            name="mobile"
            value={formData.mobile}
            onChange={handleChange}
            placeholder="Mobile Number"
            required
            pattern="[0-9]{10}"
            title="Please enter a valid 10-digit mobile number"
            className="w-full px-5 py-4 bg-transparent border-2 border-white/30 rounded-xl text-white placeholder:text-white/70 focus:outline-none focus:border-white/50 transition-colors"
          />
        </div>

        <div>
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
            placeholder="Area, City"
            required
            className="w-full px-5 py-4 bg-transparent border-2 border-white/30 rounded-xl text-white placeholder:text-white/70 focus:outline-none focus:border-white/50 transition-colors"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-4 rounded-xl transition-colors mt-8"
        >
          Get Quick Quote
        </button>
      </form>
    </div>
  )
}

export default ConsultationForm
