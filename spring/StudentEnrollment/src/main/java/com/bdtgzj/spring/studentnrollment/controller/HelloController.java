package com.bdtgzj.spring.studentnrollment.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
@RequestMapping(path="/hello")
public class HelloController {
	
	@RequestMapping(method=RequestMethod.GET)
	public String hello(Model model) {
		model.addAttribute("message", "Hello Spring Web MVC Framework!");
		return "hello";
	}
	
}