const mongoose = require("mongoose");

const SubjectSchema = new mongoose.Schema({
      subjectName : {type:String},
      subjectTagline : {type:String},
      chapters : [
          {
              cname:{type:String},
              ccontent:{type:String},
          }
      ]
});

const Subject  = mongoose.model("Subject", SubjectSchema); 
module.exports = Subject;