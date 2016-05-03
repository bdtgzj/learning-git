package com.bdtgzj.spring.StudentEnrollment.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.SessionAttributes;

import com.bdtgzj.spring.StudentEnrollment.model.Student;
import com.bdtgzj.spring.StudentEnrollment.service.StudentService;

@Controller
@SessionAttributes("student")
public class StudentController {
	
	@Autowired
	private StudentService studentService;
	
	@RequestMapping(value="/signup", method=RequestMethod.POST)
	public String signup(@ModelAttribute("student") Student student, Model model) {
		studentService.insertStudent(student);
		model.addAttribute("message", "Saved student details.");
		return "Insert Successfully!";
	}
	
}
