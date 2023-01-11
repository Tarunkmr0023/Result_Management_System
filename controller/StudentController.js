const db= require('../database/DatabaseConfig');
const get_student_login=(req,res)=>{
    res.render("Student/StudentLogin");
};
const post_student_login=async (req,res)=>{
    //res.redirect('./login');
    //console.log(req.body);
    const result=await db.promise().query(`SELECT * FROM STUDENT WHERE ROLLNO='${req.body.StudentRollNo}' AND NAME='${req.body.StudentName}' `);
    //console.log(result[0]);
    if(result[0].length===0)
    {
        res.redirect('./login');
    }
    else{
        res.render("Student/ViewStudentResult",{
            name:result[0][0].name,
            rollno:result[0][0].rollno,
            dob:result[0][0].dob,
            score:result[0][0].score
        });
    }
};
module.exports={
    get_student_login,
    post_student_login
}