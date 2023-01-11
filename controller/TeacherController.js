const db= require('../database/DatabaseConfig');
const get_teacher_login=(req,res)=>{
    res.render("Teacher/TeacherLogin");
};
const post_teacher_login=async (req,res)=>{
    //console.log(req.body);
    const users=await db.promise().query(`SELECT * FROM USER WHERE EMAIL='${req.body.email}'`);
    //console.log(users[0]);
    if(users[0].length===0)
    {
        res.redirect('./login');
    }
    else{
        if(users[0][0].password===req.body.password)
        {
            res.redirect('./home');
        }
        else
        {
            res.redirect('./login');
        }
    }
};
const get_teacher_home=async (req,res)=>{
    const results=await db.promise().query(`SELECT * FROM STUDENT`);
    res.render("Teacher/TeacherHomePage",{
        Students:results[0]
    });
};
const get_teacher_addResult=(req,res)=>{
    res.render("Teacher/AddStudentResult");
};
const post_teacher_addResult=async (req,res)=>{
    //console.log(req.body);
    const result=await db.promise().query(`INSERT INTO STUDENT VALUES('${req.body.StudentRollNo}','${req.body.StudentName}','${req.body.StudentDOB}','${req.body.StudentScore}')`);
    if(result[0].affectedRows==1)
    {
        res.redirect('./home');
    }
    else{
        res.redirect('./addResult');
    }
    
};
const get_teacher_editResult=async (req,res)=>{
    const student=await db.promise().query(`SELECT * FROM STUDENT WHERE ROLLNO='${req.params.id}'`);
    if(student[0].length===0)
    {
        res.redirect('../home');
    }
    else
    {
        res.render("Teacher/EditStudentResult",{
            name: student[0][0].name,
            rollno:req.params.id,
            dob:student[0][0].dob,
            score:student[0][0].score
        });
    }
    
};
const post_teacher_editResult=async (req,res)=>{
    //console.log(req.body);
    const result=await db.promise().query(`UPDATE STUDENT SET NAME='${req.body.StudentName}' , DOB='${req.body.StudentDOB}' , SCORE='${req.body.StudentScore}'  WHERE ROLLNO='${req.body.StudentRollNo}' `);
    if(result[0].affectedRows==1)
    {
        res.redirect('./home');
    }
    else{
        res.redirect('./editResult'+req.body.StudentRollNo);
    }
};
const get_teacher_deleteResult=async (req,res)=>{
    const result= await db.promise().query(`DELETE FROM STUDENT WHERE ROLLNO='${req.params.id}'`);
    if(result[0].affectedRows===1)
    {
        res.redirect('../home');
    }
};
module.exports={
    get_teacher_login,
    post_teacher_login,
    get_teacher_home,
    get_teacher_addResult,
    post_teacher_addResult,
    get_teacher_editResult,
    post_teacher_editResult,get_teacher_deleteResult
}