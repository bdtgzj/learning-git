package com.bdtgzj.springframework;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class MessagePrinter {

  final private MessageService service;

  @Autowired
  public MessagePriter(MessageService service;) {
    this.service = service;
  }

  public void printMessage() {
    System.out.println(this.service.getMessage());
  }

}