import { useEffect, useState } from "react"
import api from "../api/axios"

const Projects = () => {
  const [projects, setProjects] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [formData, setFormData] = useState({ title: "", description: "", image: null })
  const [fileName, setFileName] = useState("")

  const isAdminPage = window.location.pathname.startsWith("/admin")

  const fetchProjects = async () => {
    const res = await api.get("/projects")
    setProjects(res.data)
  }

  const deleteProject = async (id) => {
    if (!window.confirm("Delete this client?")) return
    await api.delete(`/projects/${id}`)
    fetchProjects()
  }

  const handleChange = (e) => {
    if (e.target.type === "file") {
      setFormData({ ...formData, image: e.target.files[0] })
      setFileName(e.target.files[0]?.name)
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value })
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const data = new FormData()
    data.append("title", formData.title)
    data.append("description", formData.description)
    data.append("image", formData.image)

    await api.post("/projects", data, {
      headers: { "Content-Type": "multipart/form-data" },
    })
    setShowModal(false)
    setFormData({ title: "", description: "", image: null })
    setFileName("")
    fetchProjects()
  }

  useEffect(() => {
    fetchProjects()
  }, [])

  return (
    <section id="projects" className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="mb-8 relative flex items-center justify-between">
          <h2 className="text-4xl font-bold text-center flex-1">
            {isAdminPage ? "Project Management" : "Our Projects"}
          </h2>

          {/* Add Project Button */}
          {isAdminPage && (
            <button
              onClick={() => setShowModal(true)}
              className="bg-blue-950 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            >
              + Add Project
            </button>
          )}
        </div>

        {/* Cards Grid */}
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
          {projects.map((project) => (
            <div
  key={project._id}
  className="bg-white border rounded-lg shadow-md p-5 flex flex-col items-center text-center 
             transition-transform duration-300 ease-in-out 
             hover:-translate-y-2 hover:shadow-[6px_6px_14px_rgba(0,0,0,0.2)]"
>

              <img
                src={`http://localhost:5000${project.image}`}
                alt={project.title}
                className="h-24 w-24 object-cover rounded-full mb-3"
              />
              <p className="text-gray-500 text-sm mb-1">{project.description}</p>
              <h3 className="font-semibold">{project.title}</h3>
              <span className="text-gray-400 text-sm">{project.role || "Employee"}</span>

              {/* Admin Buttons */}
              {isAdminPage && (
                <div className="flex gap-2 mt-3">
                  <button className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 text-sm">
                    Edit
                  </button>
                  <button
                    onClick={() => deleteProject(project._id)}
                    className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 text-sm"
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Admin Modal */}
      {isAdminPage && showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-md p-6 rounded-xl">
            <h3 className="text-xl font-semibold mb-4">Add Client</h3>

            <form onSubmit={handleSubmit} className="space-y-3">
              <input
                type="text"
                name="title"
                placeholder="Client Name"
                value={formData.title}
                onChange={handleChange}
                className="w-full border p-2 rounded"
                required
              />

              <input
                type="text"
                name="role"
                placeholder="Designation / Role"
                value={formData.role || ""}
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
                <button type="submit" className="px-4 py-2 bg-blue-950 text-white rounded">
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

export default Projects
