const toggleButton = document.getElementById('toggleMode');
toggleButton.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    if (document.body.classList.contains('dark-mode')) {
        toggleButton.textContent = 'Switch to Light Mode';
    } else {
        toggleButton.textContent = 'Switch to Dark Mode';
    }
});

// // Promise Example

// new Promise((res, rej) => {
//     const success = true;
//     if (success) {
//         res('Promise resolved successfully!');
//     } else {
//         rej('Promise rejected.');
//     }
// }).then(
//     (result) => {
//         console.log(result);
//     }
// )
// .catch(
//     (error) => {
//         console.log(error);
//     }
// )