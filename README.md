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

### Implementing back-end development (Node.js & Express)

The following tasks require the student to implement back-end mechanism that involves:

* Project initialisation:
  * Initialse a new Node.js project.
  * Set up an Express server.
  * Setup and connect to a MongoDB database.

* Data Models:
  * Design a data model for courses with fields: title, description, instructor, duration, and category.
 
* API Endpoints:
  * GET /courses: Retrieve a list all courses.
  * GET /courses/:id: Retrieve detailed information about a specific course.
  * POST /courses: Add a new course.
 
Change the directory to courses-api by:

`cd Component2/courses-api`

Initially, we need to install express and mongodb libraries to run the back-end components.
Since they were installed, we can skip the following CLIs.

`npm install express`

`npm install body-parser express-validator`

`npm install mongodb`

The objective of this exercise is to have our codes to command with Mongodb by sending requests via API endpoints to get and post the responses.

As refer to data models requirement, we need to include title, description, instructor, duration and category in each course.

Our database schema will look like the following:

`{
	"title": "string",
  "description": "string", 
  "instructor": "string", 
  "duration": "integer",
  "category": "string"
}`

Hence, we can insert the data in the following ways into mongodb:


`db.courses.insertOne({
	_id: 1,
	title: 'Introduction to Data Analytics',
	description: 'This course introduces the core concepts of data analytics, including data collection, cleaning, visualization, and interpretation. Students will explore tools and techniques used by modern analysts to uncover trends and insights from data. Through practical exercises and real-world examples, learners will build a strong foundation in working with data, creating visual dashboards, and communicating insights effectively.',
	instructor: "Nova Kade",
	duration: 70,
	category: "IT"
})`


`db.courses.insertOne({
	_id: 2,
	title: 'Digital Marketing Fundamentals',
	description: 'Digital marketing is essential for businesses in today\'s online world. In this course, students will learn the key channels used to reach and engage audiences digitally. Topics include search engine optimization (SEO), social media marketing, paid advertising, email campaigns, and content strategy. By the end of the course, learners will understand how to design and evaluate a digital marketing campaign using analytics and performance metrics.',
	instructor: "Thalorin Vey",
	duration: 60,
	category: "IT"
})`

`db.courses.insertOne({
	_id: 3,
	title: 'Project Management Essentials',
	description: 'This course covers the fundamental principles and tools used in project management. Learners will explore project planning, scheduling, budgeting, risk management, and stakeholder communication. Through structured frameworks and case studies, participants will learn how to manage resources, track project progress, and deliver results on time and within scope.',
	instructor: "Nyssa Vael",
	duration: 60,
	category: "Business"
})`


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

Lstly, for POST /courses: Add a new course, we will use Postman to make a post of new course.

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

 The idea is fairly straight forwards. 

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

However, it came with the additional features of interacting with backend-component rather than retrieve with certain data file. 

## Component 4





