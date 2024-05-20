import React, { useEffect, useState } from "react";
import {
  createEmployee,
  getEmployee,
  updateEmployee,
} from "../services/EmployeeService";
import { listDepartments } from "../services/DepartmentService";
import { useNavigate, useParams } from "react-router-dom";

const EmployeeComponent = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [departmentId, setDepartmentId] = useState("");
  const [departments, setDepartments] = useState([]);

  useEffect(() => {
    listDepartments()
      .then((response) => {
        setDepartments(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const { id } = useParams();

  useEffect(() => {
    if (id) {
      getEmployee(id)
        .then((response) => {
          setFirstName(response.data.firstName);
          setLastName(response.data.lastName);
          setEmail(response.data.email);
          setDepartmentId(response.data.departmentId);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, []);

  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    department: "",
  });

  const navigator = useNavigate();

  const handleFirstName = (e) => {
    setFirstName(e.target.value);
  };

  const handleLastName = (e) => {
    setLastName(e.target.value);
  };

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  // Function that will save/update the employee details
  const saveOrUpdateEmployee = (e) => {
    e.preventDefault();

    // For Update iff id exists and validity form should also be checked
    if (id && validateForm() == true) {
      const employee = { firstName, lastName, email, departmentId };
      updateEmployee(id, employee)
        .then((response) => {
          console.log(response.data);
          navigator("/employees");
        })
        .catch((error) => {
          console.error(error);
        });
    }

    // Check for validity form and first time entry details for employee
    else if (validateForm() == true) {
      const employee = { firstName, lastName, email, departmentId };
      console.log(employee);

      createEmployee(employee)
        .then((response) => {
          console.log(response.data);
          navigator("/employees");
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  // Function that will let us to validate whether we are submitting a null form or not.
  // If null, we need to add details
  const validateForm = () => {
    let valid = true;

    const errorsCopy = { ...errors };

    // Check validity for First Name
    if (firstName.trim()) {
      errorsCopy.firstName = "";
    } else {
      errorsCopy.firstName = "First Name is required";
      valid = false;
    }

    // Check validity for Last Name
    if (lastName.trim()) {
      errorsCopy.lastName = "";
    } else {
      errorsCopy.lastName = "Last Name is required";
      valid = false;
    }

    // Check validity for Email
    if (email.trim()) {
      errorsCopy.email = "";
    } else {
      errorsCopy.email = "Email is required";
      valid = false;
    }

    // Check validity for Department
    if (departmentId) {
      errorsCopy.department = "";
    } else {
      errorsCopy.department = "Select Department";
      valid = false;
    }

    setErrors(errorsCopy);
    return valid;
  };

  // Page Title
  const pageTitle = () => {
    if (id) {
      return <h2 className="text-center">Update Employee</h2>;
    } else {
      return <h2 className="text-center">Add Employee</h2>;
    }
  };

  return (
    <div className="container">
      <br />
      <br />
      <div className="row">
        <div className="card col-md-6 offset-md-3 offset-md-3">
          {pageTitle()}
          <div className="card-body">
            <form>
              <div className="form-group mb-2">
                <label className="form-label">First Name: </label>
                <input
                  type="text"
                  placeholder="Enter Employee First Name"
                  name="firstName"
                  value={firstName}
                  className={`form-control ${
                    errors.firstName ? "is-invalid" : ""
                  }`}
                  onChange={handleFirstName}
                ></input>
                {errors.firstName && (
                  <div className="invalid-feedback">{errors.firstName}</div>
                )}
              </div>

              <div className="form-group mb-2">
                <label className="form-label">Last Name: </label>
                <input
                  type="text"
                  placeholder="Enter Employee Last Name"
                  name="lastName"
                  value={lastName}
                  className={`form-control ${
                    errors.lastName ? "is-invalid" : ""
                  }`}
                  onChange={handleLastName}
                ></input>
                {errors.lastName && (
                  <div className="invalid-feedback">{errors.lastName}</div>
                )}
              </div>

              <div className="form-group mb-2">
                <label className="form-label">Email: </label>
                <input
                  type="email"
                  placeholder="Enter Employee Email"
                  name="email"
                  value={email}
                  className={`form-control ${errors.email ? "is-invalid" : ""}`}
                  onChange={handleEmail}
                ></input>
                {errors.email && (
                  <div className="invalid-feedback">{errors.email}</div>
                )}
              </div>

              <div className="form-group mb-2">
                <label className="form-label">Department: </label>
                <select
                  className={`form-control ${
                    errors.department ? "is-invalid" : ""
                  }`}
                  value={departmentId}
                  onChange={(e) => {
                    setDepartmentId(e.target.value);
                  }}
                >
                  <option value="Select Department">Select Department</option>

                  {departments.map((department) => (
                    <option key={department.id} value={department.id}>
                      {department.departmentName}
                    </option>
                  ))}
                </select>
                {errors.department && (
                  <div className="invalid-feedback">{errors.department}</div>
                )}
              </div>

              <button
                className="btn btn-success"
                onClick={(e) => {
                  saveOrUpdateEmployee(e);
                }}
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeComponent;
