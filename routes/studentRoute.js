const Express= require('express');
const { get_student_login, post_student_login } = require('../controller/StudentController');
const route= Express.Router();
route.get("/login",get_student_login);
route.post("/result",post_student_login);
module.exports= route;