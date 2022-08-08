const { json } = require('express');
const express = require('express');
const PORT = process.env.PORT || 80;
const app = express();
// parse incoming string or array data; must use with POST!!!
app.use(express.urlencoded({extended: true}));
// parse incoming JSON data; must use with POST!!!
app.use(express.json());
const notes = require('./db/db.json');
const randnum = require('./utils/randnum');

app.get('/api/notes', (req, res) => {
    let results = notes;
    console.log(results);
    if(results) {
        res.json(results);
    }   else {
        res.sendStatus(404);
    }    
})

app.post('/api/notes', (req, res) => {
    let results = notes
    const mapped = results.map((element) => ({
        ...element, id: randnum()
    }));
    console.log(mapped);
    res.json(mapped);
})

app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}`);
})