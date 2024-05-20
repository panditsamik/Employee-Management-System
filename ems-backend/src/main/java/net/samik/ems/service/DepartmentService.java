package net.samik.ems.service;

import net.samik.ems.dto.DepartmentDto;

import java.util.*;

public interface DepartmentService {
    // Build Create or Add Department REST API
    DepartmentDto createDepartment(DepartmentDto departmentDto);

    // Build Get Department REST API
    DepartmentDto getDepartmentById(Long departmentId);

    // Build Get All Departments REST API
    List<DepartmentDto> getAllDepartments();

    // Build Update Department REST API
    DepartmentDto updateDepartment(Long departmentId, DepartmentDto departmentDto);

    // Build Delete Department REST API
    void deleteDepartment(Long departmentId);
}
