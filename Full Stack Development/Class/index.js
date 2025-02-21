let express = require('express');

let app = express();

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.get('/students/:id', (req, res) => {
    res.send(`Student ID: ${req.params.id}`);
});

// Create a new student using get API, Pass just name and age as parameter and push to the studentsData array

let studentsData = [];

app.get('/create/:name/:age', (req, res) => {
    studentsData.push({ name: req.params.name, age: req.params.age, id: studentsData.length + 1 });
    res.json(studentsData);
});


app.listen(3000, () => {
    console.log('Server is running on port 3000');
});