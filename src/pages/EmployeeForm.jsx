import { useState } from "react";

const initialValues = {
  name: "",
  designation: "",
  location: "",
  salary: "",
};

function EmployeeForm() {
  const [values, setValues] = useState(initialValues);
  const [submitted, setSubmitted] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;
    setValues((currentValues) => ({ ...currentValues, [name]: value }));
    setSubmitted(false);
  }

  function handleSubmit(event) {
    event.preventDefault();
    setSubmitted(true);
  }

  return (
    <>
      <header className="page-heading">
        <div>
          <p className="eyebrow">PEOPLE MANAGEMENT</p>
          <h1>Employee form</h1>
          <p className="heading-description">
            Enter the details below to prepare an employee record.
          </p>
        </div>
      </header>

      <section className="surface-card form-card" aria-labelledby="form-heading">
        <div className="section-heading form-section-heading">
          <div>
            <h2 id="form-heading">Employee details</h2>
            <p>All fields are required.</p>
          </div>
        </div>

        {submitted && (
          <div className="alert alert-success" role="status">
            Employee details are ready. This demo form does not submit data to a server.
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="row g-4">
            <div className="col-md-6">
              <label className="form-label" htmlFor="name">Name</label>
              <input
                autoComplete="name"
                className="form-control"
                id="name"
                name="name"
                onChange={handleChange}
                placeholder="e.g. Jordan Lee"
                required
                value={values.name}
              />
            </div>
            <div className="col-md-6">
              <label className="form-label" htmlFor="designation">Designation</label>
              <input
                className="form-control"
                id="designation"
                name="designation"
                onChange={handleChange}
                placeholder="e.g. Product Designer"
                required
                value={values.designation}
              />
            </div>
            <div className="col-md-6">
              <label className="form-label" htmlFor="location">Location</label>
              <input
                autoComplete="address-level2"
                className="form-control"
                id="location"
                name="location"
                onChange={handleChange}
                placeholder="e.g. Seattle, WA"
                required
                value={values.location}
              />
            </div>
            <div className="col-md-6">
              <label className="form-label" htmlFor="salary">Salary</label>
              <div className="input-group">
                <span className="input-group-text" aria-hidden="true">$</span>
                <input
                  className="form-control"
                  id="salary"
                  min="0"
                  name="salary"
                  onChange={handleChange}
                  placeholder="e.g. 65000"
                  required
                  type="number"
                  value={values.salary}
                />
              </div>
            </div>
          </div>
          <div className="form-actions">
            <button className="btn btn-primary submit-button" type="submit">
              Submit employee
            </button>
          </div>
        </form>
      </section>
    </>
  );
}

export default EmployeeForm;
