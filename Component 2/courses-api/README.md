# Project Initialisation
## Initialise a new Node.js project

### Initialize a new Node.js project

We create a project folder and change directory to it by writing:

`mkdir courses-api`
`cd courses`

Initialise a new node by writing:

`npm init -y`

It should create a package.json file in the directory.

To use ES6 modules, we need to add the following line in our package.json file:

`"type":"module"`

Our package.json should look like the following:
```
{
  "name": "courses-api",
  "version": "1.0.0",
  "main": "index.js",
  "type": "module",
  "scripts": {
    "start": "node app.js",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "HC",
  "license": "ISC",
  "description": "",
  "dependencies": {
    "body-parser": "^2.2.2",
    "cors": "^2.8.6",
    "express": "^5.2.1",
    "express-validator": "^7.3.1",
    "mongodb": "^7.1.0"
  }
}
```

### Set up an Express server.

We need to make sure that the express packages is installed.

`npm install express`
`npm install body-parser express-validator`

Next, we need to create a server.
`const express = require('express');`
`const app = express();`
`const port = 3000;`

`app.use(express.json());`

Let's take an array object as an example for now to understand the fundamental concept for restful API implementation.


```
let courses = [
  {id: 1,
	title: 'Introduction to Data Analytics',
	description: 'This course introduces the core concepts of data analytics, including data collection, cleaning, visualization, and interpretation. Students will explore tools and techniques used by modern analysts to uncover trends and insights from data. Through practical exercises and real-world examples, learners will build a strong foundation in working with data, creating visual dashboards, and communicating insights effectively.',
	instructor: "Nova Kade",
	duration: 70,
	category: "IT"
},
  {
	id: 2,
	title: 'Digital Marketing Fundamentals',
	description: 'Digital marketing is essential for businesses in today\'s online world. In this course, students will learn the key channels used to reach and engage audiences digitally. Topics include search engine optimization (SEO), social media marketing, paid advertising, email campaigns, and content strategy. By the end of the course, learners will understand how to design and evaluate a digital marketing campaign using analytics and performance metrics.',
	instructor: "Thalorin Vey",
	duration: 60,
	category: "IT"
},
  {
  id: 3,
	title: 'Project Management Essentials',
	description: 'This course covers the fundamental principles and tools used in project management. Learners will explore project planning, scheduling, budgeting, risk management, and stakeholder communication. Through structured frameworks and case studies, participants will learn how to manage resources, track project progress, and deliver results on time and within scope.',
	instructor: "Nyssa Vael",
	duration: 60,
	category: "Business"
  },
];
```

Our goal is to implement GET API for all courses and individual as well as POST API to upload a new course in this part. 

Get all courses 

```
app.get('/courses', (req, res) => {
    res.json(courses); 
});
```

Get individual courses based on ID
```
app.get('/courses/:id', (req, res) => {
    const id = parseInt(req.params.id); // Parse the ID from the URL
    const course = courses.find(e => e.id === id); // Find the expense by ID
    if (course) {
        res.json(course); // Return the expense if found
    } else {
        res.status(404).json({ message: 'Course not found' }); // Return 404 if not found
    }
});
```

Create a new course
```
app.post('/courses', (req,res)=>
    //Validation middleware
    [
        body('title').isString().withMessage('Title must be a string'),
        body('description').isString().withMessage('Description must be a string'),
        body('instructor').isString().withMessage('Instructor must be a string'),
        body('duration').isInt({ gt: 0 }).withMessage('Duration must be a positive number'),
        body('category').isString().withMessage('Category must be a string')
    ],
    (req, res) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors:errors.array()});
        }
        const {title, description, instructor, duration, category} = req.body;
        const newCourse = {
            id: total+1,
            title,
            description,
            instructor,
            duration,
            category
        };
        courses.push(newCourses);
        res.status(201).json(newCourses);
    }   
);
```

Generally, we will go with the above implementations. However, this assignment requires us to extend our back-end api to communicate with the mongodb database to do what is required as mentioned above.

Firstly, we need to get our data model ready in mongoDB. To do so, we register an account with MongoDB Atlas and use MongoDB Compass to create a dataset within the collection.

I use courseApp as a name of database and courses as a collection name. 

Open the mongodb shell and insert the following lines

```
use courseApp
db.createCollection("courses")
```

We will the array object as mentioned above as our example. 

We need to set title, description, instructor, duration, and category for each course as part of the criteria.

Therefore, the schema will look like the following:
```
  "title": "string",
  "description": "string",
  "instructor": "string",
  "duration": "number",
  "category": "string",
```

We can insert the individual course or all courses with the following CREATE operation
```
db.courses.insertOne({
	_id: 1,
	title: 'Introduction to Data Analytics',
	description: 'This course introduces the core concepts of data analytics, including data collection, cleaning, visualization, and interpretation. Students will explore tools and techniques used by modern analysts to uncover trends and insights from data. Through practical exercises and real-world examples, learners will build a strong foundation in working with data, creating visual dashboards, and communicating insights effectively.',
	instructor: "Nova Kade",
	duration: 70,
	category: "IT"
})
```
```
db.courses.insertOne({
	_id: 2,
	title: 'Digital Marketing Fundamentals',
	description: 'Digital marketing is essential for businesses in today\'s online world. In this course, students will learn the key channels used to reach and engage audiences digitally. Topics include search engine optimization (SEO), social media marketing, paid advertising, email campaigns, and content strategy. By the end of the course, learners will understand how to design and evaluate a digital marketing campaign using analytics and performance metrics.',
	instructor: "Thalorin Vey",
	duration: 60,
	category: "IT"
})
```
```
db.courses.insertOne({
	_id: 3,
	title: 'Project Management Essentials',
	description: 'This course covers the fundamental principles and tools used in project management. Learners will explore project planning, scheduling, budgeting, risk management, and stakeholder communication. Through structured frameworks and case studies, participants will learn how to manage resources, track project progress, and deliver results on time and within scope.',
	instructor: "Nyssa Vael",
	duration: 60,
	category: "Business"
})
```
---

```
db.courses.insertMany([
  {
	_id: 1,
	title: 'Introduction to Data Analytics',
	description: 'This course introduces the core concepts of data analytics, including data collection, cleaning, visualization, and interpretation. Students will explore tools and techniques used by modern analysts to uncover trends and insights from data. Through practical exercises and real-world examples, learners will build a strong foundation in working with data, creating visual dashboards, and communicating insights effectively.',
	instructor: "Nova Kade",
	duration: 70,
	category: "IT"
  },
  {
  _id: 2,
	title: 'Digital Marketing Fundamentals',
	description: 'Digital marketing is essential for businesses in today\'s online world. In this course, students will learn the key channels used to reach and engage audiences digitally. Topics include search engine optimization (SEO), social media marketing, paid advertising, email campaigns, and content strategy. By the end of the course, learners will understand how to design and evaluate a digital marketing campaign using analytics and performance metrics.',
	instructor: "Thalorin Vey",
	duration: 60,
	category: "IT"
  },
  {
	_id: 3,
	title: 'Project Management Essentials',
	description: 'This course covers the fundamental principles and tools used in project management. Learners will explore project planning, scheduling, budgeting, risk management, and stakeholder communication. Through structured frameworks and case studies, participants will learn how to manage resources, track project progress, and deliver results on time and within scope.',
	instructor: "Nyssa Vael",
	duration: 60,
	category: "Business"
  }
])
```

Just before we do anything in the server file. We need to make sure we install mongodb in our node js package.

`npm install mongodb`

To set up mongodb connection, we need to include the following lines in our server js file.

```
import { MongoClient } from 'mongodb';
const uri = 'mongodb+srv://Hawk:123@hawkcluster.7y84t3h.mongodb.net/?appName=HawkCluster'; //for my example
const client = new MongoClient(uri);
```

In our backend, we use express as web framework for creating API routes, handling requests and responses, adding middleware such as validation, authetication, etc as well as connecting to database.

```
const app = express();
const PORT = 3000;
app.use(bodyParser.json()); //Middleware to parse JSON bodies
app.use(cors()); //Allow cross-origin requests that lets frontend call your express backend
```

We need to extra code to our API GET & POST by providing checks to see if the requests are valid to be responsed or otherwise return the error.

* GET /courses: Retrieve a list of all courses.

```
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
```
The code above is asking for a return of a list of courses. If the connection is failed, it will return an error mesaage. 

* GET /courses/:Id: Retrieve detailed information about a specific course.
```
app.get('/courses/:id', async (req, res) => {
  const id = parseInt(req.params.id);

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
```
The code above is asking for a return of a specific course from a list of courses based on ID. If the course is not found, it will return an 404 error with message of 'Course not found'. Likewise, if the connection is failed, it will return an error mesaage. 

* POST /courses: Add a new course.

```
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
```
The code above is used for the purpose of uploading a new dataset to MongoDB. It validates the attributes of new data in correct type before inserting it as a newCourse. Each time a course is uploaded, it will automatically insert a new id incrementing from the total of courses. If it is successfully inserted into database, it will return a status of 201. Likewise, if the connection is failed, it will return an error mesaage. 




