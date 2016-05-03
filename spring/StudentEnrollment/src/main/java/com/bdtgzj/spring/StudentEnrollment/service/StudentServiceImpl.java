package com.bdtgzj.spring.StudentEnrollment.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.bdtgzj.spring.StudentEnrollment.mapper.StudentMapper;
import com.bdtgzj.spring.StudentEnrollment.model.Student;

@Service("studentService")
public class StudentServiceImpl implements StudentService {
	
	// spring inject, otherwise: StudentMapper mapper = session.getMapper(StudentMapper.class);
	@Autowired
	private StudentMapper studentMapper;
	
	public StudentServiceImpl() {
		// TODO Auto-generated constructor stub
	}
	
	@Transactional
	public void insertStudent(Student student) {
		// TODO Auto-generated method stub
		studentMapper.insertStudent(student);
	}

}