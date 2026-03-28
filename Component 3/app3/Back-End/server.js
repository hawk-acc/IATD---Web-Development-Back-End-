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
//Declare to use the images static files
app.use('/images', express.static('images'));

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
    name: String,
    brief: String,
    description: String,
    instructor: String,
    duration: Number,
    category: String,
    modules: [String],
    picture: String    
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



// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});


