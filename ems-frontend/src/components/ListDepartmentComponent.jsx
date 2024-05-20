import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  deleteDepartment,
  listDepartments,
} from "../services/DepartmentService";

const ListDepartmentComponent = () => {
  const [departments, setDepartments] = useState([]);

  const navigator = useNavigate();

  // Get all departments
  useEffect(() => {
    listDepartments()
      .then((response) => {
        setDepartments(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [departments]);

  const addNewDepartment = () => {
    navigator("/add-department");
  };

  const updateDepartment = (departmentId) => {
    navigator(`/edit-department/${departmentId}`);
  };

  const removeDepartment = (departmentId) => {
    deleteDepartment(departmentId)
      .then((response) => {
        console.log(`${response.data}`);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="container">
      <h2 className="text-center">List of Departments</h2>

      <button
        className="btn btn-primary mb-2"
        onClick={() => {
          addNewDepartment();
        }}
      >
        Add Department
      </button>
      <br />
      <table className="table table-striped table-bordered">
        <thead>
          <tr>
            <th>Department Id</th>
            <th>Department Name</th>
            <th>Department Description</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {departments.map((department) => (
            <tr key={department.id}>
              <td>{department.id}</td>
              <td>{department.departmentName}</td>
              <td>{department.departmentDescription}</td>
              <td>
                <button
                  className="btn btn-info"
                  onClick={() => {
                    updateDepartment(department.id);
                  }}
                >
                  Update
                </button>

                <button
                  className="btn btn-danger"
                  style={{ marginLeft: "10px" }}
                  onClick={() => {
                    removeDepartment(department.id);
                  }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListDepartmentComponent;
