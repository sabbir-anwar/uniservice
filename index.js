const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const Course =  require('./models/courseModel');
const CourseStudent =  require('./models/courseStudentModel');
const PORT = process.env.PORT || 3030;

const app = express();
dotenv.config();
app.use(express.json())

// routes
// get all courses 
app.get('/course', async (req,res) => {
  try {
    const course = await Course.find({});
    res.status(200).json(course);
  } catch (error) {
    res.status(500).json({message: error.message})
  }
})

// create course
app.post('/course', async (req, res) => {
  try {
    const course = await Course.create(req.body)
    res.status(200).json(course)
  } catch (error) {
    console.log(error.message);
    res.status(500).json({message: error.message})
  }
})

// get all courses requested by students  
app.get('/course-student', async (req,res) => {
  try {
    const courseStudent = await CourseStudent.find({});
    res.status(200).json(courseStudent);
  } catch (error) {
    res.status(500).json({message: error.message})
  }
})

// create student requested course
app.post('/course-student', async (req, res) => {
  try {
    const courseStudent = await CourseStudent.create(req.body)
    res.status(200).json(courseStudent)
  } catch (error) {
    console.log(error.message);
    res.status(500).json({message: error.message})
  }
})

// Get all courses requested by student_id 
app.get('/course-student/:student_id', async (req, res) => {
  try {
    const {student_id} = req.params;
    const courseStudent = await CourseStudent.find({student_id});
    res.status(200).json(courseStudent);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({message: error.message})
  }
})

// Function to connect to MongoDB
const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO);
    console.log("Connected to MongoDB.");
  } catch (error) {
    throw error;
  }
};

mongoose.connection.on("disconnected", () => {
  console.log("mongoDB disconnected.");
});

mongoose.connection.on("connected", () => {
  console.log("mongoDB connected.");
});

app.listen(PORT, () => {
  connect();
  console.log(`Connected to backend ${PORT}`);
});
