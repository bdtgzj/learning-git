package com.bdtgzj.spring.studentnrollment.controller;

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
	
	@RequestMapping(path="/signin1", method=RequestMethod.GET)
	public String signin1() {
		System.out.println("signin1");
		return "signin1";
	}
	
	@RequestMapping(value="/signin", method=RequestMethod.GET)
	public String signin() {
		System.out.println("dd");
		return "signin";
	}
	
	@RequestMapping(value="/signup", method=RequestMethod.GET)
	public String signup(Model model) {
		Student student = new Student();
		model.addAttribute("student", student);
		return "signup";
	}
	
	@RequestMapping(value="/signup", method=RequestMethod.POST)
	public String signup(@ModelAttribute("student") Student student, Model model) {
		studentService.insertStudent(student);
		model.addAttribute("message", "Saved student details.");
		return "Insert Successfully!";
	}
	
}
