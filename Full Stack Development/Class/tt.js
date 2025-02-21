
const readline = require('readline-sync');

function generateTimetable(days, periodsCount, subjects, teachers, classes, classSubjects) {
    const periods = Array.from({ length: periodsCount }, (_, i) => i + 1); // Create periods array
    const timetable = {};

    // Initialize timetable slots
    days.forEach(day => {
        timetable[day] = {};
        classes.forEach(cls => {
            timetable[day][cls.id] = {};
            periods.forEach(period => {
                timetable[day][cls.id][period] = { subject: null, teacher: null };
            });
        });
    });

    // Function to check if a teacher is available at a given time
    function isTeacherAvailable(teacherId, day, period) {
        for (const cls in timetable[day]) {
            if (timetable[day][cls][period].teacher === teacherId) {
                return false;
            }
        }
        return true;
    }

    // Function to check if a class has a subject assigned at a given time
    function isSubjectAssignedToClass(clsId, day, period, subjectId) {
        for (const p in timetable[day][clsId]) {
            if (parseInt(p) !== period && timetable[day][clsId][p].subject === subjectId) {
                return true;
            }
        }
        return false;
    }

    // Assign subjects to classes
    for (const cls of classes) {
        const subjectsForClass = classSubjects[cls.id];
        if (!subjectsForClass) continue; // Handle cases where classSubjects might be missing data

        const subjectCounts = {};
        subjectsForClass.forEach(subjectId => {
            const subjectDetails = subjects.find(s => s.id === subjectId);
            subjectCounts[subjectId] = subjectDetails ? subjectDetails.classesPerWeek : 0;
        });

        for (const subjectId of subjectsForClass) {
            const subjectDetails = subjects.find(s => s.id === subjectId);
            const requiredClasses = subjectCounts[subjectId];

            for (let i = 0; i < requiredClasses; i++) {
                let assigned = false;
                for (const day of days) {
                    for (const period of periods) {
                        if (period === Math.ceil(periodsCount / 2)) continue; // Skip lunch break

                        if (timetable[day][cls.id][period].subject === null) {
                            const availableTeachers = teachers.filter(teacher =>
                                teacher.subjects.includes(subjectId) &&
                                teacher.classes.includes(cls.id) &&
                                isTeacherAvailable(teacher.id, day, period) &&
                                !isSubjectAssignedToClass(cls.id, day, period, subjectId)
                            );

                            if (availableTeachers.length > 0) {
                                timetable[day][cls.id][period].subject = subjectId;
                                timetable[day][cls.id][period].teacher = availableTeachers[0].id;
                                assigned = true;
                                break;
                            }
                        }
                    }
                    if (assigned) break;
                }
                if (!assigned) {
                    console.error(`Could not assign subject ${subjectId} to class ${cls.id}. Not enough available slots or teachers.`);
                    return null; // Or handle the error as needed
                }
            }
        }
    }

    // Add Lunch Break
        days.forEach(day => {
            classes.forEach(cls => {
            timetable[day][cls.id][Math.ceil(periodsCount / 2)] = { subject: "Lunch Break", teacher: null };
            });
        });

    return timetable;
}

function getInput() {
    const days = readline.question("Enter days (comma-separated):").split(",");
    const periodsCount = parseInt(readline.question("Enter number of periods:"));

    const subjects = [];
    let subjectCount = parseInt(readline.question("Enter number of subjects:"));
    for (let i = 0; i < subjectCount; i++) {
        const id = readline.question(`Enter ID for subject ${i + 1}:`);
        const name = readline.question(`Enter name for subject ${i + 1}:`);
        const classesPerWeek = parseInt(readline.question(`Enter classes per week for subject ${i + 1}:`));
        subjects.push({ id, name, classesPerWeek });
    }

    const teachers = [];
    let teacherCount = parseInt(readline.question("Enter number of teachers:"));
    for (let i = 0; i < teacherCount; i++) {
        const id = readline.question(`Enter ID for teacher ${i + 1}:`);
        const name = readline.question(`Enter name for teacher ${i + 1}:`);
        const subjectIds = readline.question(`Enter subjects for teacher ${i + 1} (comma-separated):`).split(",");
        const classIds = readline.question(`Enter classes for teacher ${i + 1} (comma-separated):`).split(",");
        teachers.push({ id, name, subjects: subjectIds, classes: classIds });
    }

    const classes = [];
    let classCount = parseInt(readline.question("Enter number of classes:"));
    for (let i = 0; i < classCount; i++) {
        const id = readline.question(`Enter ID for class ${i + 1}:`);
        const name = readline.question(`Enter name for class ${i + 1}:`);
        classes.push({ id, name });
    }

    const classSubjects = {};
    for (const cls of classes) {
        const subjectIds = readline.question(`Enter subjects for class ${cls.id} (comma-separated):`).split(",");
        classSubjects[cls.id] = subjectIds;
    }

    return { days, periodsCount, subjects, teachers, classes, classSubjects };
}



const inputData = getInput();

if (inputData) {
    const timetable = generateTimetable(
        inputData.days,
        inputData.periodsCount,
        inputData.subjects,
        inputData.teachers,
        inputData.classes,
        inputData.classSubjects
    );

    if (timetable) {
        console.log(JSON.stringify(timetable, null, 2));
    }
} else {
    console.log("Invalid input. Timetable generation failed.");
}