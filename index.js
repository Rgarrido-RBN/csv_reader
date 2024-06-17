/*
 *  index.js
 *  
 *  Date: Jun 17 05:19:31
 *  Author: Rubén Garrido 
 *  Mail: rgarrido.rbn@gmail.com
 *
 */

const express = require('express');
const multer = require('multer');
const axios = require('axios');
const path = require('path');

const app = express();
const upload = multer({ dest: 'uploads/' });

app.use(express.static(path.join(__dirname, 'public')));

app.post('/upload', upload.single('file'), (req, res) => {
    if (!req.file) {
        return res.status(400).send('No file uploaded.');
    }

    axios.post('http://localhost:5000/process', {
        filePath: req.file.path
    }).then(response => {
        res.json(response.data);
    }).catch(error => {
        res.status(500).send('Error processing file.');
    });
});

app.listen(3000, () => {
    console.log('Server started on http://localhost:3000');
});