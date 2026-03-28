import express, { json } from 'express';
import cors from 'cors'; // Import the cors package
import pkg from 'mongoose';
const { connect, connection, Schema, model, Types } = pkg;
import { v4 as uuidv4 } from 'uuid';
import { config } from 'dotenv';
config();

const app = express();
app.use(cors());
const port = process.env.PORT || 3000;

app.use(json());

// MongoDB connection
connect(process.env.MONGODB_URI);

const db = connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB');
});

// Define Mongoose schemas and models


const courseSchema = new Schema({
    _id: Number,
    title: String,
    description: String,
    instructor: String,
    duration: Number,
    category: String  
});

if (connection.models['Course']) delete connection.models['Course'];

const Course = model('Course', courseSchema);


// API endpoints

// Retrieve all courses
app.get('/courses', (req, res) => {
    Course.find({})
        .then(courses => {
            res.json(courses);
        })
        .catch(error => {
            console.error(error);
            res.status(500).send('Error retrieving courses');
        });
});



// Retrieve a single course by course_id
app.get('/courses/:id', (req, res) => {
    Course.findById(req.params.id)
        .then(course => {
            if (!course) {
                return res.status(404).send('Course not found');
            }
            res.json(course);
        })
        .catch(error => {
            console.error(error);
            res.status(500).send('Error retrieving course');
        });
});


// 1. Add a new course in the list of courses
app.post('/courses', async (req, res) => {
    const total = await Course.countDocuments();
    const newCourse = new Course({
        _id: total+1,
        ...req.body,
    });
    try {
        await newCourse.save();
        console.log('Course created:', newCourse);
        res.status(201).send(newCourse);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});


