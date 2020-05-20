const mongoose = require("mongoose");

const AssignmentSchema = new mongoose.Schema({
      subjectName : {type:String},
      chapterName:{type:String},
      chapterContent:{type:String},
      assignmentDeadline :{
        type:Date
    }
});

const Assignment  = mongoose.model("Assignment", AssignmentSchema); 
module.exports = Assignment;