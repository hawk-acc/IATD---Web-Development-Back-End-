# Project: Web Development (Back-End)

## Component 1

### Implementing Home Page & Detailed Page in React

The following tasks require the student to implement a react front-end to:

* Create a home page that displays a list of courses with:
  * An image representing the course.
  * The course title.
  * A brief description.
  * Hours to complete.
  * A button or link to view more details about the course.

* Create a detailed view page for each course with:
  * The course title.
  * An image representing the course.
  * A detailed description.
  * A list of modules or lessons included in the course.
  * An enrolment button

To clone this repository, you can copy the following CLI:

`git clone https://github.com/hawk-acc/IATD---Web-Development-Back-End-.git`

Change the directory to app1 by:

`cd Component1/app1`

Ensure NPM Node Package Manager is installed before running the application by:

`npm install`


Run the application in the terminal / command prompt by:

`npm run dev`

Insert the following URL to view the app

`http://localhost:5173/`

You should be able to see the web app appeared like the following:

![Screenshot1](https://github.com/hawk-acc/IATD---Web-Development-Back-End-/blob/main/Screenshot%201.png)

You can interact with the course listing page by clicking on the more information. It will lead you to a page which provide full detail of the selected course.

## Component 2

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

Once this step is done, we could proceed to API request.

To run the app, we could simply run the following CLI.

`npm start`

For GET /courses: Retrieve a list of courses, we could simply type http://localhost:3000/courses in browser URL to show data.

Otherwise, we use Postman to get the output which looks like the following. 

![Screenshot2](https://github.com/hawk-acc/IATD---Web-Development-Back-End-/blob/main/Screenshot%202.png)

Next, I modified the GET/courses/:Id to GET/courses/:title which will make more sense to retrieve back a particular course detail in API request.

Likewise, we can simply type http://localhost:3000/course-name in browser URL to display data.

Or get onto the Postman and make the API request.

![Screenshot3](https://github.com/hawk-acc/IATD---Web-Development-Back-End-/blob/main/Screenshot%203.png)

Lastly, for POST /courses: Add a new course, we will use Postman to make a post of new course.

We can select raw body in JSON format and add the appropriate structured data that looks something like the following to make a post.

 `{
    "title": "C Programing",
    "description": "In this course, you will learn the foundation of Programing",
    "instructor": "Peter Shadan",
    "duration": 50,
    "category": "IT"
  }`

Once it is successfully created, we can see HTTP response status code will show 201. 

![Screenshot4](https://github.com/hawk-acc/IATD---Web-Development-Back-End-/blob/main/Screenshot%204.png)

Also, ensuring that the post is successfully achieved, we can always do GET /courses to see if a new post is created in the database.

## Component 3

### Implementing Client-side Integration

* React Application:
  * Set up a React application to interact with your backend.
  * Implement a course listing page where users can see all courses.
  * Implement a course detail page where users can view more information about a specific course.

 In this exercise, we will integrate both back-end and front-end together for user to interact with the web application while connecting to database.

 Additionally, we need to keep in mind that our images file representing the course image should be stored inside the backend folder. 

In our server.js, we need to add the following code to be able to see the images on the web application.

```
//Declare to use the images static files
app.use('/images', express.static('images'));
```

 As the user gets on the web app, they should be able to view the available courses display on the main listing page. 

 Once more information button is clicked to view the particular course of interest, the API request will send to the database and expect for a response to be provided.

 After that, the user could see the full course detail in the following page which is the response coming back from database query.

 Change the directory to back-end by:

`cd Component3/app3/Back-End`

To run the back-end, we could simply run the following CLI.

`npm start`

Change the directory to front-end by:

`cd Component3/app3/Front-End`

To run the front-end, we could simply run the following CLI.

`npm run dev`

Insert the following URL to view the app

`http://localhost:5173/`

The look of this web application looks very similar to the exercise of component 1.

However, it came with the additional features of interacting with backend-component rather than retrieving static data from file. 

## Component 4

### Caching:
#### Report on how would you implement caching strategies to handle a large number of courses efficiently.
Let's imagine if we have big data containing a large number of courses in our app. Handling the high frequency of users' responses can be quite challenging. It could potentially slow down the server or make it crash.
We can implement HTTP caching that enables client-side caching and reduce server load.
CDN (Content Dynamic Network) can be used to allow the users to access the closest server in their geographical region if one of the servers fails to load.

#### Plan for cache invalidation
In many cases, the cached data could be outdated due to the updated data occurred in the web application. In our example, the microcourse app might have some changes in the courses content due to renewer of learning outcome and description. The user might still have the out-of-date cached data stored in their computer. To achieve this cache invalidation strategies, we set the conditions to remove cached items after a certain period of time or by using event-driven invalidation when data changes, i.e. course update or course delete will be executed.


### Load Balancing:
#### Report on how would you distribute incoming requests across multiple instances of your Express server.
As the web application grows, it would be thoughtful to have good strategies for handling the incoming requests across multiple instances of my Express server. 
* Use a load balancer to distribute requests
	* Spread traffic evenly - prevent users' requests overloading
 		* In our example, there could a big number of users accessing the app in one go. To prevent it from overloading, this strategy works very well.
    * Improve reliability - Redundancy (the app stays online) & Automatic Failover 
        * In our example, if one of the servers goes down, traffic will automatically be rerouted to the healthy servers, and users will never notice the failure.

### High Availability:
#### Report on how would you ensure high availability for your backend application, especially in disaster scenarios.

To ensure high availability for my backend application, I would design the system so that it can continue operating even when individual components fail or an entire region becomes unavailable. My approach focuses on redundancy, fault tolerance, and automated recovery.

* Run multiple instances of the backend by using horizontal scaling strategy. Rather than running one instances, I prefer to go with multiple instances of my Express server.
* Use a load balancer by monitoring all instances as health checks that allows automated recovery.
* Deploy across multiple zones or regions. In real world scenario, there could be any unpredictable disaster events, such as data center outage, power failure or natural disaster that could cause the lost of server connection. To prevent the limited availability from happening, we should deploy multiple instances across multiple available zones. We could use a load balancers to reroute the traffic to closest available region. Also, we need to ensure the database are replicated in different zones as well.


#### Report on how would you implement high availability for the MongoDB database in a production environment. 

To ensure high availability for the MongoDB database used in the microcourse app, I would deploy MongoDB using a replica set architecture combined with multi‑zone distribution, automated failover, and continuous backups. This design ensures that the database remains operational even if individual nodes or entire availability zones fail.

1. Deploy MongoDB as a replica set (Primary and secondaries)
   * Primary node - handles all write operations
   * Secondary nodes - continuously replicate data from primary using cloning strategy

If the primary node becomes unavailable, MongoDB automatically elects a new primary from the secondary nodes. This ensures the database remains available.

2. Distribute replica set nodes across multiple available zones

This ensures that:
* A zone outage does not take down the entire database
* A majority of nodes remain reachable
* Automatic failover can still occur

3. Enable automated backups and point-in-time recovery

This protects against:
* Accidental deletion
* Data corruption
* Catastrophic failures






