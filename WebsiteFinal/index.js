const express = require('express');
const app = express();
const mainRouter = require('./router.js');
const sessions = require('express-session');
const cookieParser = require("cookie-parser");

const oneDay = 1000 * 60 * 60 * 24;

app.use(sessions({
    secret: "445",
    saveUninitialized: true,
    cookie: { maxAge: oneDay },
    resave: false
}));

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cookieParser());
app.set('view engine','ejs');

// a lot of route
app.use('/', mainRouter);
app.use(express.static('public')) // folder สาธราณะ ไม่ต้องเข้าผ่าน route

app.get('*',(req,res)=>{
    res.sendStatus(404);
});

app.listen(3000, () => {
    console.log('http://localhost:3000');
}) 
