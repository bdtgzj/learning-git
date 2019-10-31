interface Person {
  firstName: string;
  lastName: string;
}

class Student {
  fullName: string;
  constructor(public firstName: string, public lastName: string) {
    this.fullName = firstName + ' ' + lastName;
  }
}

function hello(person: Person) {
  return 'Hello, ' + person.firstName + ' ' + person.lastName;
}

// instance 
let user = new Student('Type', 'Scripter');

// implements interface Person
// let user = { firstName: 'Type', lastName: 'Scripter' };

// in node env
console.log(hello(user));

// in browser env
// document.body.textContent = hello(user);

