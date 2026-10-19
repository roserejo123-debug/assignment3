import { useEffect, useState } from "react";

const USERS_API = "https://jsonplaceholder.typicode.com/users";

function Dashboard() {
  const [employees, setEmployees] = useState([]);
  const [status, setStatus] = useState("loading");
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    async function loadEmployees() {
      try {
        const response = await fetch(USERS_API, { signal: controller.signal });
        if (!response.ok) {
          throw new Error(`The employee list could not be loaded (${response.status}).`);
        }

        const users = await response.json();
        if (!Array.isArray(users)) {
          throw new Error("The employee service returned unexpected data.");
        }

        setEmployees(users);
        setStatus("success");
      } catch (loadError) {
        if (loadError.name !== "AbortError") {
          setError(loadError.message || "The employee list could not be loaded.");
          setStatus("error");
        }
      }
    }

    loadEmployees();
    return () => controller.abort();
  }, []);

  return (
    <>
      <header className="page-heading">
        <div>
          <p className="eyebrow">PEOPLE OVERVIEW</p>
          <h1>Employee dashboard</h1>
          <p className="heading-description">
            A clear view of the people in your organization.
          </p>
        </div>
        {status === "success" && (
          <div className="employee-count" aria-label={`${employees.length} employees`}>
            <span className="count-number">{employees.length}</span>
            <span className="count-label">Team members</span>
          </div>
        )}
      </header>

      <section className="surface-card dashboard-card" aria-labelledby="team-heading">
        <div className="section-heading">
          <div>
            <h2 id="team-heading">Team directory</h2>
            <p>Employee details fetched from the team directory.</p>
          </div>
          {status === "success" && (
            <span className="directory-badge">Directory · Live</span>
          )}
        </div>

        {status === "loading" && (
          <div className="feedback-state" role="status">
            <div className="spinner-border spinner-border-sm text-primary" aria-hidden="true" />
            <span>Loading employees…</span>
          </div>
        )}

        {status === "error" && (
          <div className="alert alert-danger mb-0" role="alert">
            {error}
          </div>
        )}

        {status === "success" && (
          <>
            <div className="table-responsive">
              <table className="table employee-table align-middle mb-0">
                <thead>
                  <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Name</th>
                    <th scope="col">Email address</th>
                  </tr>
                </thead>
                <tbody>
                  {employees.map((employee) => (
                    <tr key={employee.id}>
                      <td className="id-cell">{String(employee.id).padStart(2, "0")}</td>
                      <td>
                        <div className="person-cell">
                          <span className="avatar" aria-hidden="true">
                            {employee.name?.charAt(0)?.toUpperCase() || "?"}
                          </span>
                          <span className="person-name">{employee.name}</span>
                        </div>
                      </td>
                      <td>
                        <a className="email-link" href={`mailto:${employee.email}`}>
                          {employee.email}
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {employees.length === 0 && (
              <p className="empty-state mb-0">No employees found.</p>
            )}
          </>
        )}
      </section>
      <p className="page-footnote">Showing employee data from JSONPlaceholder.</p>
    </>
  );
}

export default Dashboard;
