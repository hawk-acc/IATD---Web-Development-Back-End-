import express from 'express';
import bodyParser from 'body-parser';
import {body, validationResult} from 'express-validator';
import courses from './data.js';

const app = express();
const PORT = 3000;

app.use('/images', express.static('images'));

//Middleware to parse JSON bodies
app.use(bodyParser.json());

// Get list of courses
app.get('/courses',(req, res)=> {
    res.json(courses);
});

//Create a new product with validation
app.post('/courses',
    //Validation middleware
    [
        body('name').isString().withMessage('Name must be a string'),
        body('brief').isString().withMessage('Brief must be a string'),
        body('description').isString().withMessage('Description must be a string'),
        body('hours').isInt({gt: 0}).withMessage('Hours must be a positive number'),
        body('modules').isArray().withMessage('Modules must be an array').custom(arr => arr.every(item => typeof item === 'string')).withMessage('Each module must be a string'),
        body('picture').isString().withMessage('Picture must be a string consists of link to image directory')
    ],
    (req, res) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors:errors.array()});
        }
        const {name, brief, description, hours, modules, picture} = req.body;
        const newCourse = {
            id: courses.length+1,
            name,
            brief,
            description,
            hours,
            modules,
            picture
        };
        courses.push(newCourse);
        res.status(201).json(newCourse);
    }
);

app.listen(PORT,()=>{
    console.log(`Server is running on http://localhost:${PORT}`);
});


