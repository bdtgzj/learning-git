import 'package:meta/meta.dart';

void main() {
  funcName(p1: 'p1');
  funcName1('p2', 'p3');
  var p = ParentClass(11);
}

void funcName({@required String p1, String p2}) {
  print(p1);
}

void funcName1(String p1, String p2, [String p3, int p4]) {
  print(p2 + p3.toString());
}

void obj() {
  var names = List<String>();
names.addAll(['Seth', 'Kathy', 'Lars']);
names.add(42); // Error

}



class ParentClass {
  num x = 0;
  // Syntactic sugar: HelloClass(this.x)
  ParentClass(num x) :x = x {
    // this.x = x;
    print(this.x);
  }
  //
  //
  ParentClass.fromJson(Map<String, num> json) {

  }
}

class ChildClass {

}