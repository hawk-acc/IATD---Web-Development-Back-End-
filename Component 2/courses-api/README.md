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
  "main": "server.js",
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
Alternatively, we can import a JSON file directly to the database.

```
[{
  "_id": 1,
  "instructor": "Nova Kade",
  "category": "IT",
  "title": "Introduction to Data Analytics",
  "description": "This course introduces the core concepts of data analytics, including data collection, cleaning, visualization, and interpretation. Students will explore tools and techniques used by modern analysts to uncover trends and insights from data. Through practical exercises and real-world examples, learners will build a strong foundation in working with data, creating visual dashboards, and communicating insights effectively.",
  "duration": 70
},
{
  "_id": 2,
  "instructor": "Thalorin Vey",
  "category": "IT",
  "title": "Digital Marketing Fundamentals",
  "description": "Digital marketing is essential for businesses in today's online world. In this course, students will learn the key channels used to reach and engage audiences digitally. Topics include search engine optimization (SEO), social media marketing, paid advertising, email campaigns, and content strategy. By the end of the course, learners will understand how to design and evaluate a digital marketing campaign using analytics and performance metrics.",
  "duration": 60
},

{
  "_id": 3,
  "instructor": "Nyssa Vael",
  "category": "Business",
  "title": "Project Management Essentials",
  "description": "This course covers the fundamental principles and tools used in project management. Learners will explore project planning, scheduling, budgeting, risk management, and stakeholder communication. Through structured frameworks and case studies, participants will learn how to manage resources, track project progress, and deliver results on time and within scope.",
  "duration": 60
}]
```

Just before we do anything in the server file. We need to make sure we install mongodb in our node js package.

`npm install mongoose`

To set up mongodb connection, we need to create a .env file containing the URi to be able to connect to the target database.

```
MONGODB_URI=mongodb+srv://Hawk:123@hawkcluster.7y84t3h.mongodb.net/courseApp
PORT=3000
```
#### server.js summary
In our backend, we use express as web framework for creating API routes, handling requests and responses, adding middleware such as validation, authetication, etc as well as connecting to database.

```
const app = express();
app.use(cors());
const port = process.env.PORT || 3000;
```

We also need to check if our backend could successfully connect to the MONGODB.
```
// MongoDB connection
connect(process.env.MONGODB_URI);

const db = connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB');
});
```

The code below define mongoose schema and model.

```
const courseSchema = new Schema({
    _id: Number,
    title: String,
    description: String,
    instructor: String,
    duration: Number,
    category: String  
});
```

The codes below are the GET and POST APIs. 
Additionally, we need to add extra code to our APIs by providing checks to see if the requests are valid to be responsed or otherwise return the error.

* GET /courses: Retrieve a list of all courses.

```
// Retrieve all students
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
```
The code above is asking for a return of a list of courses. If the connection is failed, it will return an error mesaage. 

* GET /courses/:Id: Retrieve detailed information about a specific course.
```
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
```
The code above is asking for a return of a specific course from a list of courses based on ID. If the course is not found, it will return an 404 error with message of 'Course not found'. Likewise, if the connection is failed, it will return an error mesaage. 

* POST /courses: Add a new course.

```
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
```
The code above is used for the purpose of uploading a new dataset to MongoDB. It validates the attributes of new data in correct type before inserting it as a newCourse. Each time a course is uploaded, it will automatically insert a new id incrementing from the total of courses. If it is successfully inserted into database, it will return a status of 201. Likewise, if the connection is failed, it will return an error mesaage. 




