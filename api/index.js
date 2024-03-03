var Express = require("express");
var MongoClient = require("mongodb").MongoClient;
var cors = require("cors");
var multer = require("multer");

var app = Express();
app.use(cors());
app.use(Express.json());


var CONNECTION_URL = "mongodb+srv://uainnovate:qhHSn7lPYrcSRFvN@cluster0.fdvzwdt.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
var DATABASE_NAME = "uainnovatedb";
var database, client;

app.listen(5038, () => {
    MongoClient.connect(CONNECTION_URL, (error, dbClient) => {
        if (error) {
            console.error('Error occurred while connecting to MongoDB Atlas...\n', error);
            process.exit(1); // Exit the process if the connection fails
        }

        client = dbClient;
        database = client.db(DATABASE_NAME);
        console.log("Mongo DB Connection Successful");
        console.log("Server is running on port 5038");
    });
});

app.get('/api/GetData', (request, response) => {
    // Ensure the database and collection are available
    if (!database) {
        console.error('Database is not available.');
        response.status(500).send('Internal Server Error');
        return;
    }

    const collection = database.collection("uainnovatecollection");

    collection.find({}).toArray((error, result) => {
        if (error) {
            console.error('Error occurred while fetching data from MongoDB Atlas...\n', error);
            response.status(500).send('Internal Server Error');
            return;
        }

        response.send(result);
    });
});


//CRUD operations for HR
app.post('/api/AddStudentHR', multer().none(), (request, response) => {
    console.log("In post");
    console.log(request.body);
    //const obj = JSON.parse(request.body);
    const collection = database.collection("uainnovatecollection");
    const newStudent = {
        _id: request.body.email,
        firstName: request.body.firstName,
        lastName: request.body.lastName,
        phone: request.body.phone,
        officeLocations: request.body.officeLocations,
        role: request.body.role,
        linkedin: request.body.linkedin,
        graduationDate: request.body.graduationDate,
        university: request.body.university,
        interviewStage: request.body.interviewStage,
        interviewFeedback: request.body.interviewFeedback,
        evaluationMetric: request.body.evaluationMetric

    };
    collection.insertOne(newStudent, (error, result) => {
        if (error) {
            console.error('Error inserting document: ', error);
            response.status(500).send(error);
        } else {
            response.send(result);
        }
    });
});

app.post('/api/UpdateStudentHR', multer().none(), (request, response) => {
    console.log("In post");
    console.log(request.body);
    const collection = database.collection("uainnovatecollection");
    const newStudent = {
        _id: request.body.email,
        firstName: request.body.firstName,
        lastName: request.body.lastName,
        phone: request.body.phone,
        officeLocations: request.body.officeLocations,
        linkedin: request.body.linkedin,
        graduationDate: request.body.graduationDate,
        role: request.body.role,
        university: request.body.university,
        interviewStage: request.body.interviewStage,
        interviewFeedback: request.body.interviewFeedback,
        evaluationMetric: request.body.evaluationMetric

    };
    collection.updateOne({ _id: request.body.email }, { $set: newStudent }, (error, result) => {
        if (error) {
            console.error('Error inserting document: ', error);
            response.status(500).send(error);
        } else {
            response.send(result);
        }
    });
});


//CRUD operations for HR and Student
app.post('/api/DeleteStudent', multer().none(), (request, response) => {
    console.log("In post");
    console.log(request.body);
    const collection = database.collection("uainnovatecollection");
    collection.deleteOne({ _id: request.body._id }, (error, result) => {
        if (error) {
            console.error('Error inserting document: ', error);
            response.status(500).send(error);
        } else {    
            response.send(result);
        }
    });
});


//CRUD operations for Student
app.post('/api/UpdateStudent', multer().none(), (request, response) => {
    console.log("In post");
    console.log(request.body);
    const collection = database.collection("uainnovatecollection");
    const newStudent = {
        _id: request.body.email,
        firstName: request.body.firstName,
        lastName: request.body.lastName,
        phone: request.body.phone,
        officeLocations: request.body.officeLocations,
        linkedin: request.body.linkedin,
        graduationDate: request.body.graduationDate,
        university: request.body.university,
        role: request.body.role

    };
    collection.updateOne({ _id: request.body.email }, { $set: newStudent }, (error, result) => {
        if (error) {
            console.error('Error inserting document: ', error);
            response.status(500).send(error);
        } else {
            response.send(result);
        }
    });
});


app.post('/api/AddStudent', multer().none(), (request, response) => {
    console.log("In post");
    console.log(request.body);
    const collection = database.collection("uainnovatecollection");
    const newStudent = {
        _id: request.body.email,
        firstName: request.body.firstName,
        lastName: request.body.lastName,
        phone: request.body.phone,
        role: request.body.role,
        officeLocations: request.body.officeLocations,
        linkedin: request.body.linkedin,
        graduationDate: request.body.graduationDate,
        university: request.body.university,
        role: request.body.role,
        interviewStage: null,
        interviewFeedback: null,
        evaluationMetric: null

    };
    collection.insertOne(newStudent, (error, result) => {
        if (error) {
            console.error('Error inserting document: ', error);
            response.status(500).send(error);
        } else {
            response.send(result);
        }
    });
});


//search for a single student by email
app.get('/api/GetStudent/:email', (request, response) => {
    const collection = database.collection("uainnovatecollection");
    collection.findOne({ _id: request.params.email }, (error, result) => {
        if (error) {
            console.error('Error occurred while fetching data from MongoDB Atlas...\n', error);
            response.status(500).send('Internal Server Error');
            return;
        }

        response.send(result);
    });
});

app.get('/api/SearchStudents/:firstName/:lastName', (request, response) => {
    const collection = database.collection("uainnovatecollection");
    console.log(request.params.firstName);
    console.log(request.params.lastName);
    if (request.params.firstName == "null") {
        request.params.firstName = "";
    }
    if (request.params.lastName == "null") {
        request.params.lastName = "";
    }
    
    //const name = firstName + " " + lastName;
    collection.find({ $or: [{ firstName: request.params.firstName }, { lastName: request.params.lastName }, {lastName: request.params.firstName}, {firstName: request.params.lastName}] }).toArray((error, result) => {
        if (error) {
            console.error('Error occurred while fetching data from MongoDB Atlas...\n', error);
            response.status(500).send('Internal Server Error');
            return;
        }

        response.send(result);
    });
});

//filter on office location, fulltime vs internship

app.get('/api/FilterIntern', (request, response) => {
    const collection = database.collection("uainnovatecollection");
    collection.find({ role: "Intern" }).toArray((error, result) => {
        if (error) {
            console.error('Error occurred while fetching data from MongoDB Atlas...\n', error);
            response.status(500).send('Internal Server Error');
            return;
        }

        response.send(result);
    });
});

app.get('/api/FilterFullTime', (request, response) => {
    const collection = database.collection("uainnovatecollection");
    collection.find({ role: "Full-Time" }).toArray((error, result) => {
        if (error) {
            console.error('Error occurred while fetching data from MongoDB Atlas...\n', error);
            response.status(500).send('Internal Server Error');
            return;
        }

        response.send(result);
    });
});

app.get('/api/FilterLocation/:location', (request, response) => {
    const collection = database.collection("uainnovatecollection");
    collection.find({ officeLocations: request.params.location }).toArray((error, result) => {
        if (error) {
            console.error('Error occurred while fetching data from MongoDB Atlas...\n', error);
            response.status(500).send('Internal Server Error');
            return;
        }

        response.send(result);
    });
});


// Close the MongoDB client when the application terminates
process.on('exit', (code) => {
    if (client) {
        client.close();
    }
});
