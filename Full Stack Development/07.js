// Write a custom implementation of myFilter. Your function myFilter(arr, callback) should mimic the behavior of the native Array.prototype.filter method. It should:
// 1.	Take an array and a callback function as arguments.
// 2.	Return a new array containing only the elements that satisfy the condition specified in the callback.

function myFilter(arr, callback) {
    let result = [];
    for (let i = 0; i < arr.length; i++) {
        if (callback(arr[i])) {
            result.push(arr[i]);
        }
    }
    return result;
}

const arr = [1, 2, 3, 4, 5, 6];
const evenNumbers = myFilter(arr, (num) => num % 2 === 0);
console.log(evenNumbers);