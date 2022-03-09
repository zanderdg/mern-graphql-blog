require('dotenv').config();
const path = require('path');
const chalk = require('chalk');
const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const mongoose = require('mongoose');

const feedRoutes = require('./routes/feed');
const authRoutes = require('./routes/auth');

const app = express();

// Image Upload Code 
const fileStorage = multer.diskStorage({
    destination:(req, file, cb) =>{
        cb(null, 'images');
    },
    filename: ( req, file, cb )=>{
        cb(null, new Date().toISOString() + '_' + file.originalname.replace(/\s/g, ''));
    }
});

const fileFilter = (req, file, cb) =>{
    if(file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg'){
        cb(null, true);
    } else {
        cd(null, false);
    }
};

app.use((req, res, next) =>{
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods','GET,POST, PUT,PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});
app.use(bodyParser.json()); //Used to parse incoming Json Data
app.use(multer({storage: fileStorage, fileFilter: fileFilter }).single('image'));
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use(feedRoutes);
app.use(authRoutes);

app.use((error, req, res, next) =>{
    console.error(error);
    const { statusCode, message, data  } = error;
    res.status(statusCode || 500).json({ message, data });
});
const port = 8080;


const uri = process.env.MONGO_URL;

mongoose.connect(uri, { useFindAndModify: false })
.then(() => {
    const server = app.listen(port, () => {
        console.log(chalk.green.bold(`On Port:${port}`))
        console.log(chalk.green.bold.underline(`Running on http://localhost:${port}`))
    }); 
    const io = require('./socket').init(server,{ origins: '*:*'});
    io.on('connection', socket => { 
        console.log(chalk.yellowBright.bold(`Socket Connected On Port:${port}`))
    });


}).catch((err) => {
    console.error(err);
});
