function generateTimetable(days, periods, totalSubjects, teachers, classes) {
    const timetable = {};

    // Initialize days in timetable
    days.forEach(day => {
        timetable[day] = {};
        classes.forEach(cls => {
            timetable[day][cls.id] = {};
        });
    });

    // Distribute subjects to classes
    const classSubjects = {};
    for (const cls of classes) {
        classSubjects[cls.id] = [];
    }
    totalSubjects.forEach(subject => {
        subject.classes.forEach(clsId => {
            if (!classSubjects[clsId]) classSubjects[clsId] = [];
            classSubjects[clsId].push(subject.name);
        });
    });

    // Assign subjects to periods in each day for each class
    days.forEach(day => {
        classes.forEach(cls => {
            const assignedPeriods = {};
            let periodIndex = 1;
            classSubjects[cls.id].forEach(subject => {
                if (!assignedPeriods[subject]) {
                    while (timetable[day][cls.id][periodIndex] || isTeacherBusy(teachers, subject, periodIndex)) {
                        periodIndex++;
                    }
                    assignedPeriods[subject] = periodIndex;
                }
                timetable[day][cls.id][assignedPeriods[subject]] = { subject: formatSubjectName(subject), teacher:
findTeacherForSubject(teachers, subject) };
            });
        });
    });

    // Add lunch break after 1st 4 classes in each day for each class
    days.forEach(day => {
        classes.forEach(cls => {
            let periodIndex = 1;
            while (periodIndex <= periods && timetable[day][cls.id][periodIndex]) {
                if (periodIndex === 5) { // Assuming lunch break is after the 4th class
                    timetable[day][cls.id][periodIndex + 1] = { subject: "Lunch", teacher: null };
                    periodIndex++; // Skip the lunch slot in scheduling further subjects
                }
                periodIndex++;
            }
        });
    });

    return JSON.stringify({ timetable }, null, 2);
}

function formatSubjectName(subject) {
    return subject.replace(/\s+/g, '').toUpperCase(); // Simplified formatting
}

function findTeacherForSubject(teachers, subject) {
    for (const teacher of teachers) {
        if (teacher.subjects.includes(subject)) {
            return teacher.id;
        }
    }
    return null;
}

function isTeacherBusy(teachers, subject, period) {
    for (const teacher of teachers) {
        if (teacher.subjects.includes(subject) && Object.values(timetable).flat().filter(t => t[period]?.teacher
=== teacher.id).length > 0) {
            return true;
        }
    }
    return false;
}

// Example data for testing the function
const days = ["Monday", "Tuesday"];
const periods = [1, 2, 3, 4, 5];
const totalSubjects = [
    { name: "English", classes: ["9A", "10B"] },
    { name: "Maths", classes: ["9A", "10B"] },
    { name: "Science", classes: ["10B"] },
    // Add more subjects as needed
];
const teachers = [
    { id: "T1", name: "Teacher A", subjects: ["English", "Maths"], classes: ["9A", "10B"] },
    { id: "T2", name: "Teacher B", subjects: ["Maths"], classes: ["10B"] },
    // Add more teachers as needed
];
const classes = [
    { id: "9A", name: "Grade 9A" },
    { id: "10B", name: "Grade 10B" },
    // Add more classes as needed
];

console.log(generateTimetable(days, periods, totalSubjects, teachers, classes));