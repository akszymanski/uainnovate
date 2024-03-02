var Express = require("express");
var MongoClient = require("mongodb").MongoClient;
var cors = require("cors");

var app = Express();
app.use(cors());

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

app.post('/api/AddStudent', (formData, response) => {
    database.collection("uainnovatecollection").insertOne(formData.body, (error, result) => {
        if (error) {
            console.error('Error occurred while adding data to MongoDB Atlas...\n', error);
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
