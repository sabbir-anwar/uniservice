const mongoose = require('mongoose')

const courseStudentSchema = mongoose.Schema({
    course_name: {
        type: String,
        require: true
    },
    student_name: {
        type: String,
        require: true
    },
    student_id: {
        type: String,
        require: true
    }
})

// Add constraint
// ensure that the "same student and the same course" is unique.
courseStudentSchema.index({ student_id: 1, course_name: 1 }, { unique: true });

const CourseStudent = mongoose.model('CourseStudent', courseStudentSchema);

module.exports = CourseStudent;

