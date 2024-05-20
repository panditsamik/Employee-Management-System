package net.samik.ems.mapper;

import net.samik.ems.dto.DepartmentDto;
import net.samik.ems.entity.Department;

public class DepartmentMapper {
    // Map Department JPA Entity to DepartmentDto
    public static DepartmentDto mapToDepartmentDto(Department department) {
        return new DepartmentDto(
                department.getId(),
                department.getDepartmentName(),
                department.getDepartmentDescription()
        );
    }


    // Map DepartmentDto to Department JPA Entity
    public static Department mapToDepartment(DepartmentDto departmentDto) {
        return new Department(
                departmentDto.getId(),
                departmentDto.getDepartmentName(),
                departmentDto.getDepartmentDescription()
        );
    }
}
