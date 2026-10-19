import { NavLink, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard.jsx";
import EmployeeForm from "./pages/EmployeeForm.jsx";

function App() {
  return (
    <div className="app-shell">
      <nav className="navbar navbar-expand-md app-navbar">
        <div className="container app-container">
          <NavLink className="navbar-brand brand" to="/">
            <span className="brand-mark" aria-hidden="true">P</span>
            PeopleDesk
          </NavLink>
          <div className="navbar-nav ms-auto flex-row gap-2">
            <NavLink
              className={({ isActive }) =>
                `nav-link nav-item-link${isActive ? " active" : ""}`
              }
              end
              to="/"
            >
              Home
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                `nav-link nav-item-link${isActive ? " active" : ""}`
              }
              to="/employee-form"
            >
              Employee form
            </NavLink>
          </div>
        </div>
      </nav>

      <main className="container app-container page-content">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/employee-form" element={<EmployeeForm />} />
          <Route
            path="*"
            element={
              <section className="surface-card text-center py-5">
                <h1 className="h3">Page not found</h1>
                <p className="text-secondary mb-0">
                  The page you’re looking for doesn’t exist.
                </p>
              </section>
            }
          />
        </Routes>
      </main>
    </div>
  );
}

export default App;
