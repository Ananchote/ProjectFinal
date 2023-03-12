const express = require('express');
const router = express.Router()
const userController= require('./controller/userControl');
const getUserId = userController.getUserId;

var session;

router.get('/', (req, res) => {
    session = req.session;
    if (session.userid) {
        res.redirect('/dashboard');
    } else
        res.render('login.ejs'); // the most beutiful login ever (may be) 
});

router.post('/user/login', async (req, res) => {
    //console.log("in the session :",req.session);
    //if (req.body.username == myusername && req.body.password == mypassword) { // ไว้เเเบบ ไม่มี database
    let id = await getUserId(req.body.username, req.body.password)
    //console.log(id);
    if (id) {
        session = req.session;
        session.userid = id;
        console.log(session, "has loged in\n");
        res.redirect('/dashboard');
    }
    else {
        res.render('login.ejs');
    }
});

router.get('/dashboard',
    (req, res, next) => { //after dashboard
        session = req.session;
        if (session.userid) {
            //res.send('now loading dashboard . . .');
            next();//เข้าสู่ dashboard จริงๆ
        } else {
            //res.send('U must login before use dashboard<br> <a href="/">login</a>'); // ปัญญาออ่นไป
            res.redirect('/');
        }
    },
    async (req, res) => {/**if has log in yet */
        res.render('dashboard.ejs');
    });


module.exports = router;