const { json } = require("express");
const express = require("express");
const PORT = process.env.PORT || 80;
const notes = require("./db/db.json");
const randnum = require("./utils/randnum");
const path = require("path");
// const { fstat } = require('fs');
const fs = require("fs");
const app = express();
// used to serve other dependent files, like CSS and JS, from public folder; must use!!
app.use(express.static("public"));
// parse incoming string or array data; must use with POST!!!
app.use(express.urlencoded({ extended: true }));
// parse incoming JSON data; must use with POST!!!
app.use(express.json());

// function createNote(bodyRand) {

//     const note = bodyRand
//     console.log(note);
//     const string = JSON.stringify(notes)
//     console.log(string)
//     // const modNote = notes.map(note)
//     // console.log(modNote);

//     // const mapped = Array.push(notesArr, note);
//     // fs.writeFileSync(path.join(__dirname, './db/db.json'),
//     // JSON.parse(mapped));
//     // console.log(mapped);
// }

app.get("/api/notes", (req, res) => {
  let results = notes;
  console.log(results);
  if (results) {
    res.json(results);
  } else {
    res.sendStatus(404);
  }
});

app.post("/api/notes", (req, res) => {
  console.info(`${req.method} request received.`);
  // adds random number to note entered
  const mapped = req.body.map((element) => ({
    ...element,
    id: randnum(),
  }));

  // let added = []

  // adds random number to note(s) in json file
  // let results = notes
  // const mapped = results.map((element) => ({
  //     ...element, id: randnum()
  // }));
  // console.log(req.body, " ---1")
  // added.push(mapped)
  // added.push(mapped)
  // console.log(added, " ---6 after push")
  // console.log(mapped, " ---2")
  // console.log(JSON.stringify(mapped), " ---5")

  // check to make sure both properties are present
  // if (title && text) {
  //     const newNote = {
  //         title,
  //         text,
  //         id: randnum(),
  //     };
  //     console.log(newNote);
  // }   else {
  //     res.json("Error")
  // }

  // string = JSON.stringify(req.body)
  // console.log(string, " ---3")
  // console.log(JSON.parse(string), "---4");
  // => {

  // }) {
  //     console.log("nothing in the file!")
  // }   else {
  //     // convert existing notes
  //     parsedNotes = JSON.parse(data);
  //     // add new note to existing note
  //     parsedNotes.push(mapped);
  //     const notesString = JSON.stringify(parsedNotes)
  //     fs.writeFileSync(path.join(__dirname, './db/db.json'),
  //     notesString, (err) => {
  //         console.error(err)
  //         });
  //         notes.push(mapped)
  // }

  fs.readFile("./db/db.json", "utf8", (err, data) => {
    if (err) {
      console.error(err);
      return;
    } else {
      if (data) {
        // convert existing notes
        parsedNotes = JSON.parse(data);
        // add new note to existing note
        parsedNotes.push(mapped);
        const notesString = JSON.stringify(parsedNotes);
        fs.writeFileSync(
          path.join(__dirname, "./db/db.json"),
          notesString,
          (err) => {
            console.error(err);
          }
        );
      } else {
        notes.push(mapped);
      }
    }
  });
  res.json(mapped);
});

app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/notes.html"));
});

// wildcard route to catch a request for routes that don't exist
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});

app.listen(PORT, () => {
  console.log(`API server now on port ${PORT}`);
});
