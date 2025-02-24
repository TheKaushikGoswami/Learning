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

  // var
  var subject = "Maths";

  var test; // when not initialised, the data type is dynamic

  test = "D"; // can accept string
  test = 14; // as well as integer
  test = 9.889; // and decimal values

  // dynamic
  dynamic x;

  x = "String";
  x = 9;
  x = false;

  var h = Human(); // Object creation
  h.myFunc("Kaushik"); // Function Calling

  h.myFunc("Wowww");

  print(h.Add(1, 2));
}

class Human {
  // Constructors

  // Default Construtor
  Human() {
    print("New Object Created!");
  }

  // Functions
  void myFunc(String name) {
    // Function declaration
    print("Hello, World! $name"); // Function definition
  }

  int Add(int a, int b) {
    return a + b;
  }

}
