const users = require('../models/userModel.js');

function getUserId(un, pw) {
    return new Promise((resolve, reject) => {
        users.findOne({username:un, password:pw},(err,data)=>{
            if(err) {resolve("");}
            if (data){resolve(data.id);}
            else {resolve("");}
        });
    });
}

module.exports = {
    getUserId: getUserId
}