const { json } = require('express');
const express = require('express');
const PORT = process.env.PORT || 80;
const notes = require('./db/db.json');
const randnum = require('./utils/randnum');
const path = require('path');
const app = express();
// used to serve other dependent files, like CSS and JS; must use!!
app.use(express.static('public'));
// parse incoming string or array data; must use with POST!!!
app.use(express.urlencoded({extended: true}));
// parse incoming JSON data; must use with POST!!!
app.use(express.json());

function validateNote() {
    
}

app.get('/api/notes', (req, res) => {
    let results = notes;
    console.log(results);
    if(results) {
        res.json(results);
    }   else {
        res.sendStatus(404);
    }    
});

app.post('/api/notes', (req, res) => {
    let results = notes
    const mapped = results.map((element) => ({
        ...element, id: randnum()
    }));
    // console.log(mapped);
    res.json(mapped);
    console.log(path.join(__dirname, './public/index.html'));
});

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname,'./public/index.html'));
});

app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}`);
})