const  mongoose  = require("mongoose");

const url = 'mongodb://127.0.0.1:27017/ANC';
mongoose.connect(url);

// ตรวจสอบการเชื่อมต่อ
const db = mongoose.connection;
db.once('open', () => {
    console.log('students adaptor connect :', url);
})

db.on('error', (err) => {
    console.error('connection error :', err);
})

const userSchema = new mongoose.Schema({//collection record ของนักศึกษา... ทำกิจกรรม... เเล้ว เพื่อให้ง่ายต่อการ searching
    username:{ type: String},
    password:{ type: String}
})

module.exports = mongoose.model('users', userSchema);
//ตัวสร้าง schema ไว้เชื่อต่อ database