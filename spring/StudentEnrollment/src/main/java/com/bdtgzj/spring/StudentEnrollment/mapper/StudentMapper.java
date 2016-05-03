package com.bdtgzj.spring.StudentEnrollment.mapper;

import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Options;

import com.bdtgzj.spring.StudentEnrollment.model.Student;

public interface StudentMapper {
	@Insert("INSERT INTO Student(username, password) VALUES (#{username}, #{password})")
	@Options(useGeneratedKeys=true, keyProperty="id", keyColumn="id")
	public void insertStudent(Student student);
}
