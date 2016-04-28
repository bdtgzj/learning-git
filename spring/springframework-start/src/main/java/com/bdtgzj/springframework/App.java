package com.bdtgzj.springframework;

import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.*;

/**
 * Hello world!
 *
 */

@Configuration
@ComponentScan
public class App {

  @Bean
  MessageService mockMessageService() {
    return new MessageService() {
      public String getMessage() {
        return "Hello World!";
      }
    };
  }

  public static void main( String[] args ) {
    ApplicationContext context = new AnnotationConfigApplicationContext(App.class);
    MessagePrinter printer = context.getBean(MessagePrinter.class);
    printer.printMessage();
  }

}