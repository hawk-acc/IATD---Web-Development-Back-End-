# Project: Web Development (Back-End)

## Component 1

### Implementing Home Page & Detailed Page in React

This assessment task requires the student to implement a react front-end to:

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
  * An enrollemtn button

To clone this repository, you can copy the following CLI:

`git clone https://github.com/hawk-acc/IATD---Web-Development-Back-End-.git`

Change the directory to app1 by:

`cd Component1/app1`

Ensure NPM Node Package Manager is installed before running the application by:

`npm install`


Run the application in the terminal / command prompt by:

`npm run dev`

You should be able to see the web app appeared like the following:

![Screenshot1](https://github.com/hawk-acc/IATD---Web-Development-Back-End-/blob/main/Screenshot%201.png)

You can interact with the course listing page by clicking on the more information. It will lead you to a page which provide full detail of the selected course.

## Component 2

### Implementing back-end development (Node.js & Express)

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
 
Change the directory to app1 by:

`cd Component2/courses-api`

