const express = require('express');
const fs = require('fs');
const path = require('path');
const allNotes = require('./db/db.json');
const uuid = require('uuid');

const app = express();

const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

// returns index.html
app.get('/', function (req, res) {
    res.sendFile(
        path.join(__dirname, '/public/index.html')
    );
});

// returns notes.html
app.get('/notes', function (req, res) {
    res.sendFile(
        path.join(__dirname, '/public/notes.html')
    );
});

// reads the db.json file and returns all saved notes as JSON
app.get('/api/notes', (req, res) => {
    res.sendFile(
        path.join(__dirname, '/db/db.json'))
});

// receives a new note to save on the request body and adds it to db.json file and then returns new note to client
app.post('/api/notes', (req, res) => {
    const allNotes = JSON.parse(
        fs.readFileSync('./db/db.json')
    );

    const newlyCreatedNotes = req.body;
    // uuid npm package gives each note note a unique id when saved
    newlyCreatedNotes.id = uuid.v4();
    allNotes.push(newlyCreatedNotes);

    fs.writeFileSync('./db/db.json', JSON.stringify(allNotes))
    res.json(allNotes);
});

// delete request can be added here

// listening
app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
});
