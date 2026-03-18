import express from 'express';
import bodyParser from 'body-parser';
import {body, validationResult} from 'express-validator';
import { MongoClient } from 'mongodb';
import cors from 'cors';
//import courses from './data.js';

const app = express();
const PORT = 3000;

const uri = 'mongodb+srv://Hawk:123@hawkcluster.7y84t3h.mongodb.net/?appName=HawkCluster'; // Please update this URI from your atlas account 
const client = new MongoClient(uri);
//app.use('/images', express.static('images'));

let db;

// Connect ONCE when the server starts without race conditions
async function connectDB() {
  await client.connect();
  console.log("Connected to MongoDB");
  db = client.db("courseApp");
}

connectDB();


//Middleware to parse JSON bodies
app.use(bodyParser.json());
app.use(cors());

// Get list of courses
app.get('/courses', async(req, res)=> {
    let courses = [];
    try {
        //Connect to the MongoDB cluster
        await client.connect();

        //Confirm connection
        console.log('Connected to MongoDB');

        //Specify database and collection
        const database = client.db('courseApp');
        const collection = database.collection('courses');

        //Fetch all courses
        courses = await collection.find({}).toArray();

        //Log the list of courses
        console.log('List of Courses:', courses);
        res.json(courses);
    } catch (error) {
        console.error('Error connecting to MongoDB', error);
    } finally {
        //Close the connection
        await client.close();
    }
    
});

// Get information for a specific course
app.get('/courses/:id', async (req, res) => {
  const { id } = req.params;

  try {
    await client.connect();
    console.log('Connected to MongoDB');

    const database = client.db('courseApp');
    const collection = database.collection('courses');

    // Find ONE course by title
    const course = await collection.findOne({ _id: Number(id)});

    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    res.json(course);

  } catch (error) {
    console.error('Error fetching course', error);
    res.status(500).json({ message: 'Server error' });
  } finally {
    await client.close();
  }
});

//Create a new course with validation
app.post('/courses',
    //Validation middleware
    [
       body('title').isString().withMessage('Title must be a string'),
       body('description').isString().withMessage('Description must be a string'),
       body('instructor').isString().withMessage('Instructor must be a string'),
       body('duration').isInt({ gt: 0 }).withMessage('Duration must be a positive number'),
       body('category').isString().withMessage('Category must be a string')
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors:errors.array()});
        }


        // courses.push(newCourse);
        // 
        try {
            //connect to the MongoDB cluster
            await client.connect();

            //Confirm connection
            console.log('Connected to MongoDB');

            //Specify database and collection
            const database = client.db('courseApp');
            const collection = database.collection('courses');

            const total = await collection.countDocuments();

            const { title, description, instructor, duration, category} = req.body;
            const newCourse = {
                _id: total+1,
                title,
                description,
                instructor,
                duration,
                category
            };
            //Example operation (insert a document)
            const result = await collection.insertOne(newCourse);
            console.log('Document inserted with _id: ', result.insertedId);

            res.status(201).json(newCourse);
        } catch (error){
            console.error('Error connecting to MongoDB', error);
        }finally{
            //Close the connection
            await client.close();
        }
    }
);

app.listen(PORT,()=>{
    console.log(`Server is running on http://localhost:${PORT}`);
});


