// Import some dependencies/ packages 

// HTTP framework for handling requests
const express = require('express');
//Instance of express framework
const app = express(); 
// DBMS Mysql 
const mysql = require('mysql2');
// Cross Origin Resourse Sharing 
const cors = require('cors');
// Environment variable doc 
const dotenv = require('dotenv'); 

// 
app.use(express.json());
app.use(cors());
dotenv.config(); 

// connection to the database 
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME 
});

// Check if there is a connection 
db.connect((err) => {
    // If no connection 
    if(err) return console.log("Error connecting to MYSQL");

    //If connect works successfully
    console.log("Connected to MYSQL as id: ", db.threadId); 
}) 

// < YOUR code goes down here 

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

// Data is a file found in the Views folder 

app.get('/data', (req,res) => {

    // Retrieve data from database 
    db.query(
        'SELECT patient_id, first_name, last_name, ' +
        'DATE_FORMAT(date_of_birth, "%Y-%m-%d") as date_of_birth ' +
        'FROM patients',
        (err, results) => {
            if (err) {
                console.error(err);
                res.status(500).send('Error Retrieving data');
            } else {
                // Display the records to the browser
                res.render('data', { results: results });
            }
        }
    );
});

app.get('/providers', (req,res) => {

    // Retrieve data from database 
    db.query(
        'SELECT first_name, last_name, provider_specialty ' +
        'FROM providers',
        (err, results) => {
            if (err) {
                console.error(err);
                res.status(500).send('Error Retrieving data');
            } else {
                // Display the records to the browser
                res.render('providers', { results: results });
            }
        }
    );
});

app.get('/patients_first_name', (req,res) => {

    // Retrieve data from database 
    db.query(
        'SELECT *, DATE_FORMAT(date_of_birth, "%Y-%m-%d") as date_of_birth ' +
        'FROM patients ' +
        'ORDER BY first_name',
        (err, results) => {
            if (err) {
                console.error(err);
                res.status(500).send('Error Retrieving data');
            } else {
                // Display the records to the browser
                res.render('patients_first_name', { results: results });
            }
        }
    );
});

app.get('/providers_specialty', (req,res) => {

    // Retrieve data from database 
    db.query(
        'SELECT * FROM providers ORDER BY provider_specialty',
        (err, results) => {
            if (err) {
                console.error(err);
                res.status(500).send('Error Retrieving data');
            } else {
                // Display the records to the browser
                res.render('providers_specialty', { results: results });
            }
        }
    );
});

// <Your code goes up there

// Start the server 

const PORT = 3000
   app.listen(PORT, () => {
    console.log(`server is runnig on http://localhost:${PORT}`)

    //Sending a message to the browser 
    console.log('Sending message to browser...');
    app.get('/', (req,res) => {
        res.send('Server Started Successfully!');
     
   })
});
// app.listen(process.env.PORT, () => {
//     console.log(`Server listening on port ${process.env.PORT}`);

//     // Sending a message to the browser 
//     console.log('Sending message to browser...');
//     app.get('/', (req,res) => {
//         res.send('Server Started Successfully!');
//     });

// });