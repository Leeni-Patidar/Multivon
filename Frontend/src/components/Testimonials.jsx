import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import api from "../api/axios"
import { isAuthenticated } from "../auth/auth"

const Clients = () => {
  const isAdmin = isAuthenticated()
  const location = useLocation()
  const isAdminRoute = location.pathname.startsWith("/admin")

  const [clients, setClients] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [showModal, setShowModal] = useState(false)
  const [fileName, setFileName] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    designation: "",
    image: null,
  })

  useEffect(() => {
    fetchClients()
  }, [])

  const fetchClients = async () => {
    try {
      const res = await api.get("/clients")
      setClients(res.data)
    } catch {
      setError("Failed to load clients")
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e) => {
    const { name, value, files } = e.target
    if (name === "image") {
    setFormData({ ...formData, image: files[0] });
    setFileName(files[0]?.name || ""); // store file name
  } else {
    setFormData({ ...formData, [name]: value });
  }
};
   

  const handleSubmit = async (e) => {
    e.preventDefault()

    const data = new FormData()
    Object.entries(formData).forEach(([key, value]) =>
      data.append(key, value)
    )

    await api.post("/clients", data)

    setShowModal(false)
    setFormData({
      name: "",
      description: "",
      designation: "",
      image: null,
    })

    fetchClients()
  }

  if (loading) return <p className="text-center py-10">Loading...</p>
  if (error) return <p className="text-center text-red-500">{error}</p>

  return (
    <section className={`py-16 ${isAdmin ? "bg-white" : "bg-gray-50"}`}>
      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <div className="mb-12 relative">
          {/* Centered Heading */}
          <h2 className="text-4xl font-bold text-center">
            {isAdmin && isAdminRoute ? "Client Management" : "Happy Clients"}
          </h2>

          {/* Add Client → below heading, right corner */}
          {isAdmin && isAdminRoute && (
            <div className="mt-4 flex justify-end">
              <button
                onClick={() => setShowModal(true)}
                className="bg-blue-950 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
              >
                + Add Client
              </button>
            </div>
          )}
        </div>


        {/* Cards */}
        <div
          className={`grid gap-8 ${
            isAdmin && isAdminRoute
              ? "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3"
              : "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
          }`}
        >
          {clients.map((client) => (
            <div
              key={client._id}
              className={`bg-white p-6 rounded-xl text-center transition-all border
                ${
                  isAdmin && isAdminRoute
                    ? "hover:shadow-[6px_6px_14px_rgba(0,0,0,0.2)]"
                    : "shadow-md hover:-translate-y-2 hover:shadow-xl"
                }`}
            >
              <img
              src={`${import.meta.env.VITE_BACKEND_URL}${client.image}`}
              alt={client.name}
              className="w-16 h-16 rounded-full mx-auto mb-4 object-cover"
            />


              <p className="text-sm text-gray-600 mb-4">
                {client.description}
              </p>

              <h4 className="font-semibold">{client.name}</h4>

              <span className="text-xs text-gray-500">
                {client.designation}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Admin Modal */}
      {isAdmin && isAdminRoute && showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-md p-6 rounded-xl">
            <h3 className="text-xl font-semibold mb-4">Add Client</h3>

            <form onSubmit={handleSubmit} className="space-y-3">
              

              <input
                type="text"
                name="name"
                placeholder="Client Name"
                value={formData.name}
                onChange={handleChange}
                className="w-full border p-2 rounded"
                required
              />

              <input
                type="text"
                name="designation"
                placeholder="Designation"
                value={formData.designation}
                onChange={handleChange}
                className="w-full border p-2 rounded"
                required
              />

              <textarea
                name="description"
                placeholder="Client Description"
                value={formData.description}
                onChange={handleChange}
                className="w-full border p-2 rounded"
                rows="3"
                required
              />
               
               <div className="w-full border rounded-md p-2 flex items-center justify-between cursor-pointer relative">
                <span className="text-sm text-gray-500">{fileName || "Choose file"}</span>
                <input
                  type="file"
                  name="image"
                  onChange={handleChange}
                  required
                  className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                />
              </div>


              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 border rounded"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-950 text-white rounded"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  )
}

export default Clients
