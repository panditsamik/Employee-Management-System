package net.samik.ems.service.impl;

import lombok.AllArgsConstructor;
import net.samik.ems.dto.DepartmentDto;
import net.samik.ems.entity.Department;
import net.samik.ems.exception.ResourceNotFoundException;
import net.samik.ems.mapper.DepartmentMapper;
import net.samik.ems.repository.DepartmentRepository;
import net.samik.ems.service.DepartmentService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;


@Service
@AllArgsConstructor
public class DepartmentServiceImpl implements DepartmentService {

    private DepartmentRepository departmentRepository;

    @Override
    public DepartmentDto createDepartment(DepartmentDto departmentDto) {
        Department department = DepartmentMapper.mapToDepartment(departmentDto);
        Department savedDepartment = departmentRepository.save(department);

        return DepartmentMapper.mapToDepartmentDto(savedDepartment);
    }

    @Override
    public DepartmentDto getDepartmentById(Long departmentId) {
        Department department = departmentRepository.findById(departmentId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Department doesn't exist with the given id " + departmentId));
        return DepartmentMapper.mapToDepartmentDto(department);
    }

    @Override
    public List<DepartmentDto> getAllDepartments() {
        List<Department> list = departmentRepository.findAll();
        return list.stream().map(department -> DepartmentMapper.mapToDepartmentDto(department))
                .collect(Collectors.toList());
    }

    @Override
    public DepartmentDto updateDepartment(Long departmentId, DepartmentDto departmentDto) {
        Department department = departmentRepository.findById(departmentId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Department doesn't exist with the given id " + departmentId));
        department.setDepartmentName(departmentDto.getDepartmentName());
        department.setDepartmentDescription(departmentDto.getDepartmentDescription());

        Department updatedDepartmentObj = departmentRepository.save(department);
        return DepartmentMapper.mapToDepartmentDto(updatedDepartmentObj);
    }

    @Override
    public void deleteDepartment(Long departmentId) {
        Department department = departmentRepository.findById(departmentId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Department doesn't exist with the given id " + departmentId));
        departmentRepository.deleteById(departmentId);
    }
}
