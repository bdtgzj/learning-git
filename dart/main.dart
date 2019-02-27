import 'package:meta/meta.dart';

void main() {
  funcName(p1: 'p1');
  funcName1('p2', 'p3');
}

void funcName({@required String p1, String p2}) {
  print(p1);
}

void funcName1(String p1, String p2, [String p3, int p4]) {
  print(p2 + p3.toString());
}