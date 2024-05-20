import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  createDepartment,
  getDepartmentById,
  updateDepartment,
} from "../services/DepartmentService";

const DepartmentComponent = () => {
  const [departmentName, setDepartmentName] = useState("");
  const [departmentDescription, setDepartmentDescription] = useState("");

  const navigator = useNavigate();

  const { id } = useParams();

  useEffect(() => {
    if (id) {
      getDepartmentById(id)
        .then((response) => {
          setDepartmentName(response.data.departmentName);
          setDepartmentDescription(response.data.departmentDescription);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, []);

  const saveOrUpdateDepartment = (e) => {
    e.preventDefault();

    const department = { departmentName, departmentDescription };

    // If id exists, we update the department details
    if (id) {
      updateDepartment(id, department)
        .then((response) => {
          console.log(response.data);
          navigator("/departments");
        })
        .catch((error) => {
          console.error(error);
        });
    }
    // Post Department Details while saving
    else {
      createDepartment(department)
        .then((response) => {
          console.log(response.data);
          navigator("/departments");
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  // If id exists, then Update Department title is shown, otherwise Add ...
  const pageTitle = () => {
    if (id) {
      return <h2 className="text-center">Update Department</h2>;
    } else {
      return <h2 className="text-center">Add Department</h2>;
    }
  };

  return (
    <div className="container">
      <br />
      <div className="row">
        <div className="card col-md-6 offset-md-3 offset-md-3">
          {pageTitle()}

          <div className="card-body">
            <form>
              <div className="form-group mb-2">
                <label className="form-label">Department Name: </label>
                <input
                  type="text"
                  name="departmentName"
                  placeholder="Enter Department Name"
                  value={departmentName}
                  onChange={(e) => setDepartmentName(e.target.value)}
                  className="form-control"
                ></input>
              </div>

              <div className="form-group mb-2">
                <label className="form-label">Department Description: </label>
                <input
                  type="text"
                  name="departmentDescription"
                  placeholder="Enter Department description"
                  value={departmentDescription}
                  onChange={(e) => setDepartmentDescription(e.target.value)}
                  className="form-control"
                ></input>
              </div>
            </form>

            <button
              className="btn btn-success mb-2"
              onClick={(e) => {
                saveOrUpdateDepartment(e);
              }}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DepartmentComponent;
