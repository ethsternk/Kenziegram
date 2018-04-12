const express = require('express');
const multer = require('multer');
const fs = require('fs');
const upload = multer({
    dest: 'public/'
})
const port = 3000;
const app = express();
// let uploadMessage = "";

const uploaded_files = [];

app.use(express.static('public'));

app.post('/upload', upload.single('myFile'), function (req, res, next) {
    // req.file is the `myFile` file
    // req.body will hold the text fields, if there were any
    console.log("Uploaded: " + req.file.filename);
    uploaded_files.push(req.file.filename);
    res.send(`
        <link rel="stylesheet" href="style.css">
        <h1>Welcome to Kenziegram!</h1>
        <p>File successfully uploaded!</p>
        <a href="http://localhost:3000/">Go back</a>
        <img src="` + req.file.filename + `">`
        );
    // uploadMessage = "<span>Uploaded file!</span>"
    // res.redirect('/');
})

app.get('/', function (req, res) {
    const path = './public';
    fs.readdir(path, function (err, items) {
        console.log(items);
        let itemsImages = "";
        for (let i = 1; i < items.length; i++) {
            itemsImages += ("<img src='" + items[i] + "'>")
        }
        res.send(`
        <link rel="stylesheet" href="style.css">
        <h1>Welcome to Kenziegram!</h1>
        <form action="http://localhost:3000/upload" method="post" enctype="multipart/form-data">
            <input type="file" id="file" name="myFile">
            <input type="submit" id="submit" value="Upload">
        </form>
        <div id="images">${itemsImages}</div>`
        );
        // uploadMessage = "";
    });
})

app.get('/style.css', function (req, res) {
    res.sendFile(__dirname + "/" + "style.css");
});

app.listen(port);