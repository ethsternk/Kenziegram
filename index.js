const express = require('express');
const multer = require('multer');
const fs = require('fs');
const upload = multer({
    dest: 'public/'
})
const port = 3000;
const app = express();

const uploadedImages = [];

app.set('view engine', 'pug');

app.use(express.static('public'));
app.use(express.static('views'));
app.use(express.json());

app.get('/', function (req, res) {
    const path = './public';
    fs.readdir(path, function (err, items) {
        res.render('home', {
            images: items
        });
    });
})

app.post('/images', function (req, res) {
    // console.log("req.body: " + JSON.stringify(req.body));
    let newImages = {
        images: [],
        timestamp: Date.now()
    };
    for (let i = 0; i < uploadedImages.length; i++) {
        if (uploadedImages[i].timestamp > req.body.after) {
            newImages.images.push(uploadedImages[i].image);
        }
    }
    // console.log("newImages: " + JSON.stringify(newImages));
    res.send(newImages);
})

app.post('/upload', upload.single('myFile'), function (req, res, next) {
    uploadedImages.push({
        image: req.file.filename,
        timestamp: Date.now()
    });
    res.render('upload', {
        image: req.file.filename
    });
    // console.log(uploadedImages[0]);
})

app.listen(port);