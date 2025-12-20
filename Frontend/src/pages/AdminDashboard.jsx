"use client"

import { useEffect, useState } from "react"
import api from "../api/axios"

import {
  FaFolderOpen,
  FaUsers,
  FaFileAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaCalendarAlt,
} from "react-icons/fa"

import Projects from "../components/Projects"
import Clients from "../components/Testimonials"
import Navbar from "../components/Navbar"

/* ---------------- UI HELPERS ---------------- */

const Card = ({ children }) => (
  <div className="bg-white rounded-xl shadow-sm overflow-hidden">
    {children}
  </div>
)

const StatCard = ({ title, value, icon }) => (
  <Card>
    <div className="p-6 flex justify-between items-center">
      <div>
        <p className="text-sm text-gray-500">{title}</p>
        <p className="text-3xl font-bold">{value}</p>
      </div>
      <div className="text-gray-400 text-2xl">{icon}</div>
    </div>
  </Card>
)

/* ---------------- MAIN COMPONENT ---------------- */

export default function AdminDashboard() {
  const [loading, setLoading] = useState(true)

  const [stats, setStats] = useState({
    projects: 0,
    clients: 0,
    contacts: 0,
    subscribers: 0,
  })

  const [contacts, setContacts] = useState([])
  const [subscribers, setSubscribers] = useState([])

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [
          projectsRes,
          clientsRes,
          contactsRes,
          subscribersRes,
        ] = await Promise.all([
          api.get("/projects"),     // 🔐 admin protected
          api.get("/clients"),      // 🔐 admin protected
          api.get("/contact"),      // 🔐 admin protected
          api.get("/subscriber"),   // 🔐 admin protected
        ])

        /* ---------- STATS ---------- */
        setStats({
          projects: projectsRes.data?.length || 0,
          clients: clientsRes.data?.length || 0,
          contacts: contactsRes.data?.length || 0,
          subscribers: subscribersRes.data?.length || 0,
        })

        /* ---------- CONTACTS ---------- */
        setContacts(
          Array.isArray(contactsRes.data)
            ? contactsRes.data.map((c) => ({
                id: c._id,
                name: c.fullName,
                email: c.email,
                phone: c.mobile,
                city: c.city,
                date: new Date(c.createdAt).toLocaleDateString(),
              }))
            : []
        )

        /* ---------- SUBSCRIBERS ---------- */
        setSubscribers(
          Array.isArray(subscribersRes.data)
            ? subscribersRes.data.map((s) => ({
                id: s._id,
                email: s.email,
                date: new Date(s.createdAt).toLocaleDateString(),
              }))
            : []
        )
      } catch (error) {
        console.error(
          "Admin Dashboard Fetch Error:",
          error.response?.data || error.message
        )
      } finally {
        setLoading(false)
      }
    }

    fetchDashboardData()
  }, [])

  /* ---------------- LOADING STATE ---------------- */

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Loading dashboard...</p>
      </div>
    )
  }

  /* ---------------- UI ---------------- */

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-7xl mx-auto px-6 py-8 space-y-12">

        {/* -------- STATS -------- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard title="Projects" value={stats.projects} icon={<FaFolderOpen />} />
          <StatCard title="Clients" value={stats.clients} icon={<FaUsers />} />
          <StatCard title="Contact Forms" value={stats.contacts} icon={<FaFileAlt />} />
          <StatCard title="Subscribers" value={stats.subscribers} icon={<FaEnvelope />} />
        </div>

        {/* -------- PROJECTS & CLIENTS -------- */}
        <Projects />
        <Clients />

        {/* -------- CONTACT FORMS -------- */}
        <section>
          <h2 className="text-2xl font-bold mb-4">Contact Forms</h2>
          <Card>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 text-sm">
                <thead className="bg-blue-900">
                  <tr>
                    <th className="px-4 py-3 text-left text-white">Name</th>
                    <th className="px-4 py-3 text-left text-white">Email</th>
                    <th className="px-4 py-3 text-left text-white">Phone</th>
                    <th className="px-4 py-3 text-left text-white">City</th>
                    <th className="px-4 py-3 text-left text-white">Date</th>
                  </tr>
                </thead>

                <tbody className="bg-white divide-y divide-gray-200">
                  {contacts.length ? (
                    contacts.map((c) => (
                      <tr key={c.id} className="hover:bg-gray-50">
                        <td className="px-4 py-3">{c.name}</td>
                        <td className="px-4 py-3 text-gray-600">{c.email}</td>
                        <td className="px-4 py-3 text-gray-600">{c.phone}</td>
                        <td className="px-4 py-3 flex items-center gap-2 text-gray-600">
                          <FaMapMarkerAlt className="text-gray-400" /> {c.city}
                        </td>
                        <td className="px-4 py-3 text-gray-600">{c.date}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={5} className="px-4 py-3 text-center text-gray-500">
                        No contacts found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </Card>
        </section>

        {/* -------- SUBSCRIBERS -------- */}
        <section>
          <h2 className="text-2xl font-bold mb-4">Newsletter Subscribers</h2>
          <Card>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 text-sm">
                <thead className="bg-blue-900">
                  <tr>
                    <th className="px-4 py-3 text-left text-white">Email</th>
                    <th className="px-4 py-3 text-left text-white">Date</th>
                  </tr>
                </thead>

                <tbody className="bg-white divide-y divide-gray-200">
                  {subscribers.length ? (
                    subscribers.map((s) => (
                      <tr key={s.id} className="hover:bg-gray-50">
                        <td className="px-4 py-3">{s.email}</td>
                        <td className="px-4 py-3 flex items-center gap-2 text-gray-600">
                          <FaCalendarAlt className="text-gray-400" /> {s.date}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={2} className="px-4 py-3 text-center text-gray-500">
                        No subscribers found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </Card>
        </section>
      </div>
    </div>
  )
}
