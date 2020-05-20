const express = require("express");
const router = express.Router();
const Question = require("../models/Question");
const Subject = require("../models/Subject");
const Assignment = require("../models/Assignment")
const mongoose = require("mongoose")
const moment = require("moment");
moment().format();

const {ensureAuthenticated} = require("../config/auth");
let ct=0;

router.get("/",(req,res)=>{
    res.render("welcome");
})

router.get("/dashboard",ensureAuthenticated,(req,res)=>{
    Subject.find({},(err,subjects)=>{
        //console.log(req.user._id);
        if(err){
            console.log(err);
        }else{
            //console.log(subjects);
            res.render("dashboard",{
                subjects,
                username:req.user.name
            });
        }
    })
})

router.get("/subject/:id",ensureAuthenticated,(req,res)=>{
    Subject.findById(req.params.id,(err,subject)=>{
        //console.log(subject);
        res.render("subject",{
            subject
        });
    });
})

router.get("/createQuiz",ensureAuthenticated,(req,res)=>{
    res.render("createQuiz");
})

router.post("/createQuiz",ensureAuthenticated,(req,res)=>{
    //console.log(req.body);
    const {questionSubject,questionText,options,correctOption} =  req.body;
    const newQuestion = new Question({
        questionSubject,
        questionText,
        options,
        correctOption
    })
    newQuestion.save((err)=>{
        if(err){
            console.log(err);
        }else{
            req.flash('success_msg','Question added successfully');
            res.redirect("/createQuiz");
        }
    })

})

router.get("/quiz",ensureAuthenticated,(req,res)=>{
    Question.find({},(err,questions)=>{
        if(err){
            console.log(err);
        }else{
            const username = req.user.name;
            res.render("quiz",{
                questions,
                username
            });
        }
    })
})

router.post("/quiz",ensureAuthenticated,(req,res)=>{
    for(const key in req.body){
        Question.findOne({_id:key},(err,ques)=>{
            if(err){
                console.log(err);
            }else{
                 if(ques.correctOption===req.body[key]) {ct++;}
            }
        })
    }
    //console.log(ct);
    res.redirect("/score");
})

router.get("/score",ensureAuthenticated,(req,res)=>{
    //res.send(`correct : ${ct}`);
    res.render("score",{
        ct
    });
})

router.get("/assignment",ensureAuthenticated,(req,res)=>{
    const userId= req.user._id;
    const adminId = mongoose.Types.ObjectId("5ec3b46c89a0182a3483c911");
    let admin= false;
    if(String(userId) == String(adminId)){
        admin = true;
    }
    Assignment.find({},(err,assignment)=>{
        if(err){
            console.log(err);
        }else{
            res.render("assignment",{
                admin,
                assignment,
            });
        }
    })
})

router.get("/assignment/:id",(req,res)=>{
    Assignment.findById(req.params.id,(err,assign)=>{
        //console.log(assign);
        res.render("subAssign",{
            assign
        });
    });
})

router.get("/createAssignment",ensureAuthenticated,(req,res)=>{
    res.render("createAssign");
})

router.post("/createAssignment",ensureAuthenticated,(req,res)=>{
    //console.log(req.body);
    const {subjectName,chapterName,chapterContent,assignmentDeadline} =  req.body;
    const newAssign = new Assignment({
        subjectName,
        chapterName,
        chapterContent,
        assignmentDeadline
    })
    newAssign.save((err)=>{
        if(err){
            console.log(err);
        }else{
            req.flash('success_msg','Assignment added successfully');
            res.redirect("/assignment");
        }
    })
})

module.exports = router;