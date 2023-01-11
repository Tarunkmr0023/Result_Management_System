const express= require('express');
const app= express();
const port=3000;
app.set('view engine','ejs');
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

var expressEjsLayouts= require('express-ejs-layouts');
app.use(expressEjsLayouts);
app.set('layout','layouts/layout');
const StudentRoute= require('./routes/studentRoute');
const TeacherRoute= require('./routes/teacherRoute');
app.use("/student",StudentRoute);
app.use("/teacher",TeacherRoute);
app.get("/",(req,res)=>{
    res.render('index');
})
app.listen(port,()=>{
    console.log("App is listening on port : "+port);
});

app.use((req,res)=>{
    res.status(404).render('error');
});