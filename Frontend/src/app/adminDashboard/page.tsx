"use client";
import dayGridPlugin from "@fullcalendar/daygrid";
import FullCalendar from "@fullcalendar/react";
import axios from "axios";
import { useEffect, useState } from "react";
import "../Assets/css/adminDashboard.modules.css";
import Navbar from "../navbar/navBar";
import AddProjectForm from "./addProjectForm";
import AppointmentSelector from "./appointmentSelector";
import Sidebar from "./sidebar";


interface Review {
  _id: string;
  name: string;
  stars: number;
  title: string;
  content: string;
  createdAt: string;
}

interface Appointment {
  _id: string;
  name: string;
  date: string;
  time: string;
  location: string;
  notes?: string;
  email?: string;
  phone?: string;
}
interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  admin: string;
  createdAt: string;
}

interface ContactForm {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  createdAt: string;
}

const translations = {
  en: {
    addProject: "Add Project",
    autofill: "Autofill from Appointment",
    manageReviews: "Manage Reviews",
    reviews: "Reviews",
    delete: "Delete",
    noReviews: "No reviews available.",
    appointmentsHeader: "Manage Upcoming and Past Appointments",
    appointments: "Appointments",
    projects: "Projects",
    inProgress: "View In-Progress Projects",
    loadingAppointments: "Loading appointments...",
    location: "Location",
    notes: "Notes",
    email: "Email",
    call: "Call",
    noAppointments: "No appointments available.",
    noUsers: "No users available.",
    viewAllAppointments: "View All Appointments",
    viewInProgress: "View In-Progress Projects",
    calendarHeader: "Appointments",
    users: "Users",
    admin: "Admin",
    createdAt: "Created at",
    contactForms: "Contact Us Forms",
    subject: "Subject",
    message: "Message",
    noForms: "No forms available.",
    toggleLang: "Español",
  },
  es: {
    addProject: "Agregar Proyecto",
    autofill: "Autocompletar desde la Cita",
    manageReviews: "Administrar Reseñas",
    reviews: "Reseñas",
    delete: "Eliminar",
    noReviews: "No hay reseñas disponibles.",
    appointmentsHeader: "Administrar Citas Futuras y Pasadas",
    appointments: "Citas",
    projects: "Proyectos",
    inProgress: "Ver Proyectos en Progreso",
    loadingAppointments: "Cargando citas...",
    location: "Ubicación",
    notes: "Notas",
    email: "Correo",
    call: "Llamar",
    noAppointments: "No hay citas disponibles.",
    noUsers: "No hay usuarios disponibles.",
    viewAllAppointments: "Ver Todas las Citas",
    viewInProgress: "Ver Proyectos en Progreso",
    calendarHeader: "Citas",
    users: "Usuarios",
    admin: "Administrador",
    createdAt: "Creado el",
    contactForms: "Formularios de Contacto",
    subject: "Asunto",
    message: "Mensaje",
    noForms: "No hay formularios disponibles.",
    toggleLang: "English",
  },
};

export default function AdminDashboard() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddProjectForm, setShowAddProjectForm] = useState(false);
  const [showAppointmentSelector, setShowAppointmentSelector] = useState(false);
  const [autofillData, setAutofillData] = useState({
    name: "",
    email: "",
  });
  const [users, setUsers] = useState<User[]>([]);
  const [contactForms, setContactForms] = useState<ContactForm[]>([]);
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);


  //For english to spanish
  const [language, setLanguage] = useState("en");
  const t = translations[language];
  const toggleLanguage = () => {
    setLanguage((prev) => (prev === "en" ? "es" : "en"));
  };

  // Fetch reviews from MongoDB
  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/api/reviews`)
      .then((response) => {
        setReviews(response.data);
      })
      .catch((error) => console.error("Error fetching reviews:", error));
  }, []);
  // Fetch appointments from MongoDB
  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/api/appointments`)
      .then((response) => {
        setAppointments(response.data);
        setLoading(false);
      })
      .catch((error) => console.error("Error fetching appointments:", error));
  }, []);

  // Delete a review
  const handleDeleteReview = (id: string) => {
    axios
      .delete(`${process.env.NEXT_PUBLIC_API_URL}/api/reviews/${id}`)
      .then(() => {
        setReviews(reviews.filter((review) => review._id !== id));
      })
      .catch((error) => console.error("Error deleting review:", error));
  };
  // Fetch users from MongoDB
  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/api/users/`)
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => console.error("Error fetching users:", error));
  }, []);

  // Delete a user
  const handleDeleteUser = (id: string) => {
    axios
      .delete(`${process.env.NEXT_PUBLIC_API_URL}/api/users/${id}`)
      .then(() => {
        setUsers(users.filter((user) => user._id != id));
      })
      .catch((error) => console.error("Error deleting user:", error));
  };

  // Fetch contact us forms from MongoDB
  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/api/contactUs`)
      .then((response) => {
        setContactForms(response.data);
      })
      .catch((error) => console.error("Error fetching contact forms:", error));
  }, []);

  //Delete a contact form
  const handleDeleteContactForm = (id: string) => {
    axios
      .delete(`${process.env.NEXT_PUBLIC_API_URL}/api/contactUs/${id}`)
      .then(() => {
        setContactForms(
          contactForms.filter((contactForm) => contactForm._id != id)
        );
      })
      .catch((error) => console.error("Error deleting contact form:", error));
  };

  const handleProjectAdded = (project: any) => {
    setShowAddProjectForm(false);
  };

  // When an appointment is selected, update autofillData
  const handleAppointmentSelect = (data: { name: string; email: string }) => {
    setAutofillData(data);
    setShowAppointmentSelector(false);
  };

  const calendarEvents: { title: string; start: string; id: string }[] =
    appointments
      .map((appointment) => {
        if (!appointment.date || !appointment.time) {
          console.error("❌ Missing Date/Time in Appointment:", appointment);
          return null; // Skip invalid entries
        }

        try {
          // ✅ Parse and format the date correctly
          const formattedDate = new Date(appointment.date)
            .toISOString()
            .split("T")[0];

          // ✅ Convert time to a valid format
          const timeParts = appointment.time.match(
            /^(\d{1,2}):(\d{2}) (AM|PM)$/i
          );
          if (!timeParts) {
            console.warn(
              "⚠️ Time format does not match expected format:",
              appointment.time
            );
            return null;
          }

          const hours = parseInt(timeParts[1], 10);
          const minutes = timeParts[2];
          const ampm = timeParts[3];

          // Convert to 24-hour format for ISO string
          const militaryHours =
            ampm.toUpperCase() === "PM" && hours !== 12 ? hours + 12 : hours;
          const formattedTime = `${militaryHours
            .toString()
            .padStart(2, "0")}:${minutes}:00`;

          console.log("✅ Processed Time:", formattedTime);

          return {
            title: `${hours}:${minutes} ${ampm}`, // Display 12-hour format for UI
            start: `${formattedDate}T${formattedTime}`, // Ensure correct date-time format
            id: appointment._id,
          };
        } catch (error) {
          console.error("⚠️ Error processing event:", appointment, error);
          return null;
        }
      })
      .filter(
        (event): event is { title: string; start: string; id: string } =>
          event !== null
      ); // ✅ Type-safe filtering

  return (
    <>
      <div className="navbar">
        <Navbar />
      </div>
      <div className="dashboard">
        <Sidebar onToggleLanguage={toggleLanguage} />

        {showAddProjectForm && (
          <div className="modalOverlay">
            <div className="modalContent">
              <button
                className="closeButton"
                onClick={() => setShowAddProjectForm(false)}
              >
                ❌
              </button>
              <button onClick={() => setShowAppointmentSelector(true)}>
                {t.autofill}
              </button>
              <AddProjectForm
                initialCustomerName={autofillData.name}
                initialEmail={autofillData.email}
                onProjectAdded={() => setShowAddProjectForm(false)}
              />
            </div>
          </div>
        )}

        {showAppointmentSelector && (
          <AppointmentSelector
            onSelect={handleAppointmentSelect}
            onClose={() => setShowAppointmentSelector(false)}
          />
        )}

        <div className="mainContent">
          <section className="sectionWrapper" id="reviewsSection">
            <h2 className="sectionHeader">{t.reviews}</h2>
            <button
              className="sectionHeaderButton"
              onClick={() => (window.location.href = "/AdminReviews")}
            >
              {t.manageReviews}
            </button>

            {reviews.length > 0 ? (
              reviews.map((r) => (
                <div key={r._id} className="review-card">
                  <p>
                    <strong>{r.name}</strong> {"⭐".repeat(r.stars)}
                  </p>
                  <p>
                    <em>{new Date(r.createdAt).toLocaleString()}</em>
                  </p>
                  <p>
                    <strong>{r.title}</strong>
                  </p>
                  <p>{r.content}</p>
                  <button onClick={() => handleDeleteReview(r._id)}>
                    {t.delete}
                  </button>
                </div>
              ))
            ) : (
              <p>{t.noReviews}</p>
            )}
          </section>

          <section className="sectionWrapper" id="appointmentsSection">
            <h2 className="sectionHeader">{t.appointments}</h2>
            <button
              className="sectionHeaderButton"
              onClick={() => (window.location.href = "/AdminAppointments")}
            >
              {t.appointmentsHeader}
</button>

<div className="calendarWidget">
  <FullCalendar
    plugins={[dayGridPlugin]}
    initialView="dayGridMonth"
    events={calendarEvents}
    height="auto"
    headerToolbar={{
      left: "prev,next today",
      center: "title",
      right: "dayGridMonth,dayGridWeek,dayGridDay",
    }}
    eventClick={(info) => {
      const appointmentId = info.event.id;
      const appointment = appointments.find((apt) => apt._id === appointmentId);
      if (appointment) {
        setSelectedAppointment(appointment);
      }
    }}
  />

  {selectedAppointment && (
    <div className="modalOverlay">
      <div className="modalContent">
        <button className="closeButton" onClick={() => setSelectedAppointment(null)}>❌</button>
        <h3>{selectedAppointment.name}</h3>

        <p>
  <strong>Date:</strong>{" "}
  {new Date(selectedAppointment.date).toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
  })}
</p>
<p>
  <strong>Time:</strong>{" "}
  {new Date(selectedAppointment.date).toLocaleTimeString(undefined, {
    hour: "numeric",
    minute: "2-digit",
  })}
</p>


        <p><strong>Location:</strong> {selectedAppointment.location}</p>
        {selectedAppointment.notes && <p><strong>Notes:</strong> {selectedAppointment.notes}</p>}
        {selectedAppointment.email && (
          <button onClick={() => window.location.href = `mailto:${selectedAppointment.email}`}>
            {t.email}
          </button>
        )}
        {selectedAppointment.phone && (
          <button onClick={() => window.location.href = `tel:${selectedAppointment.phone}`}>
            {t.call}
          </button>
        )}
      </div>
    </div>
  )}
</div>


<div className="appointmentScrollArea">
{loading ? (
              <p>{t.loadingAppointments}</p>
            ) : (
              appointments.map((apt) => (
                <div key={apt._id} className="appointment-card">
                  <p>
                    <strong>{apt.name}</strong>
                  </p>
                  <p>
                      {new Date(apt.date).toLocaleDateString(undefined, {
                          year: "numeric",
                         month: "long",
                          day: "numeric",
                          })} – {apt.time}
                  </p>
                  <p>
                    <strong>{t.location}:</strong> {apt.location}
                  </p>
                  {apt.notes && (
                    <p>
                      <strong>{t.notes}:</strong> {apt.notes}
                    </p>
                  )}
                  {apt.email && (
                    <button
                      onClick={() =>
                        (window.location.href = `mailto:${apt.email}`)
                      }
                    >
                      {t.email}
                    </button>
                  )}
                  {apt.phone && (
                    <button
                      onClick={() =>
                        (window.location.href = `tel:${apt.phone}`)
                      }
                    >
                      {t.call}
                    </button>
                  )}
                </div>
              ))
            )}
            </div>
          </section>

          <section className="sectionWrapper" id="projectsSection">
            <h2 className="sectionHeader">{t.projects}</h2>
            <button
              className="viewInProgressButton"
              onClick={() => setShowAddProjectForm(true)}
            >
              {t.addProject}
            </button>
            <button
              className="viewInProgressButton"
              onClick={() => (window.location.href = "/AdminProjects")}
            >
              {t.inProgress}
            </button>
          </section>

          <section className="sectionWrapper" id="usersSection">
            <h2 className="sectionHeader">{t.users}</h2>
            {users.map((user) => (
              <div key={user._id} className="user-card">
                <p>
                  <strong>
                    {user.firstName} {user.lastName}
                  </strong>
                </p>
                <p>
                  {user.email} | {user.phone}
                </p>
                <p>
                  {t.admin}: {user.admin.toString()}
                </p>
                <p>
                  {t.createdAt}: {new Date(user.createdAt).toLocaleString()}
                </p>
                <button id={user._id} onClick={() => handleDeleteUser(user._id)}>
                  {t.delete}
                </button>
              </div>
            ))}
          </section>

          <section className="sectionWrapper" id="contactFormsSection">
            <h2 className="sectionHeader">{t.contactForms}</h2>
            {contactForms.map((form) => (
              <div key={form._id} className="contactForm-card">
                <p>
                  <strong>
                    {form.firstName} {form.lastName}
                  </strong>
                </p>
                <p>
                  {form.email} | {form.phone}
                </p>
                <p>
                  {t.subject}: {form.subject}
                </p>
                <p>
                  {t.message}: {form.message}
                </p>
                <p>
                  {t.createdAt}: {new Date(form.createdAt).toLocaleString()}
                </p>
                <button id={form._id} onClick={() => handleDeleteContactForm(form._id)}>
                  {t.delete}
                </button>
              </div>
            ))}
          </section>
        </div>
      </div>
    </>
  );
}
