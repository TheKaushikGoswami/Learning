// Write a C++ program to convert a given non-negative integer into English words.

#include <iostream>
#include <string>
using namespace std;

string convert(int num) {
    string result = "";
    string ones[] = {"", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine"};
    string teens[] = {"Ten", "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen", "Seventeen", "Eighteen", "Nineteen"};
    string tens[] = {"", "", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"};

    if (num < 10) {
        result = ones[num];
    } else if (num < 20) {
        result = teens[num - 10];
    } else if (num < 100) {
        result = tens[num / 10] + " " + ones[num % 10];
    } else if (num < 1000) {
        result = ones[num / 100] + " Hundred " + convert(num % 100);
    } else if (num < 1000000) {
        result = convert(num / 1000) + " Thousand " + convert(num % 1000);
    } else if (num < 1000000000) {
        result = convert(num / 1000000) + " Million " + convert(num % 1000000);
    } else {
        result = convert(num / 1000000000) + " Billion " + convert(num % 1000000000);
    }

    return result;
}

int main() {
    int num;
    cin >> num;

    if (num == 0) {
        cout << "Zero" << endl;
    } else {
        cout << convert(num) << endl;
    }

    return 0;
}