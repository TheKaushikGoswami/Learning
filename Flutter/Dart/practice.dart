// ignore_for_file: unused_local_variable

import 'dart:io';

void main() {
  print("Hi! I am Kaushik");

  stdout.write("Enter your name: ");
  var name = stdin.readLineSync();

  print("Welcome, $name");

  var kaushik = new Human(); // creating a Class Object

  // Declaration of Variable

  int i;
  // print(i);          Error: Non-nullable variable 'i' must be assigned before it can be used.

  int? a; // Null-able variable : Can have null valueb
  print(a);

  int b;
  b = 5;
  print(b);
  b = 10; // Updates the value of b
  print(b);

  // Inline Declaration
  String s = "Kaushik";

  // BigInt
  BigInt longValue;
  longValue = BigInt.parse('87654345676543245676543');

  print(longValue);

  // Decimal
  double d = 9.77;
  num dd = 9.78;

  // Boolean
  bool isLogin = false;
  isLogin = true;
}


class Human {
  Human();
}
