import React from "react";
import axios from "axios";

const REST_API_BASE_URL = "http://localhost:8080/api/employees";

// Get all Employees
function listEmployees() {
  return axios.get(REST_API_BASE_URL);
}

// Post Employee details
const createEmployee = (employee) => {
  return axios.post(REST_API_BASE_URL, {
    firstName: employee.firstName,
    lastName: employee.lastName,
    email: employee.email,
    departmentId: employee.departmentId,
  });
};

// Get Employee details for a particular id
const getEmployee = (employeeId) => {
  return axios.get(REST_API_BASE_URL + "/" + employeeId);
};

// Edit/Put Employee details
const updateEmployee = (employeeId, employee) => {
  return axios.put(REST_API_BASE_URL + "/" + employeeId, {
    firstName: employee.firstName,
    lastName: employee.lastName,
    email: employee.email,
    departmentId: employee.departmentId,
  });
};

// Delete Employee details for a particular id
const deleteEmployee = (employeeId) => {
  return axios.delete(REST_API_BASE_URL + "/" + employeeId);
};

export {
  listEmployees,
  createEmployee,
  getEmployee,
  updateEmployee,
  deleteEmployee,
};
