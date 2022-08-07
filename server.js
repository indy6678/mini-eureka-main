const express = require('express');
const PORT = process.env.PORT || 80;
const app = express();
const db = require('./db/db.json');

app.get('/db', (req, res) => {
    let results = db;
    console.log(results);
    if(results) {
        res.json(results);
    }   else {
        res.sendStatus(404);
    }    
})

app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}`);
})