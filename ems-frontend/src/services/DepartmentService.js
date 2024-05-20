import React from "react";
import axios from "axios";

const DEPARTMENT_REST_API_BASE_URL = "http://localhost:8080/api/departments";

// Get All Departments
const listDepartments = () => {
  return axios.get(DEPARTMENT_REST_API_BASE_URL);
};

// Post Department Details
const createDepartment = (department) => {
  return axios.post(DEPARTMENT_REST_API_BASE_URL, {
    departmentName: department.departmentName,
    departmentDescription: department.departmentDescription,
  });
};

// Get department details for a particular department id
const getDepartmentById = (departmentId) => {
  return axios.get(DEPARTMENT_REST_API_BASE_URL + "/" + departmentId);
};

// Edit/Put Department details
const updateDepartment = (departmentId, department) => {
  return axios.put(DEPARTMENT_REST_API_BASE_URL + "/" + departmentId, {
    departmentName: department.departmentName,
    departmentDescription: department.departmentDescription,
  });
};

// Delete department details for a particular department id
const deleteDepartment = (departmentId) => {
  return axios.delete(DEPARTMENT_REST_API_BASE_URL + "/" + departmentId);
};

export {
  listDepartments,
  createDepartment,
  getDepartmentById,
  updateDepartment,
  deleteDepartment,
};
