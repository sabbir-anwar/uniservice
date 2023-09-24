const mongoose = require('mongoose')

const courseSchema = mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    description: {
        type: String
    }
})

const Course = mongoose.model('Course', courseSchema);

module.exports = Course;

