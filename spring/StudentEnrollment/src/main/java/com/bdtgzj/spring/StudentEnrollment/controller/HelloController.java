package com.bdtgzj.spring.StudentEnrollment.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
@RequestMapping(value="/hello")
public class HelloController {
	
	@RequestMapping(value="/world", method=RequestMethod.GET)
	public String hello1(Model model) {
		model.addAttribute("message", "Hello Spring Web MVC Framework!");
		return "hello";
	}
	
}