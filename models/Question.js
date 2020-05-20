const mongoose = require("mongoose");

const QuestionsSchema = new mongoose.Schema({
  questionSubject: {type: String},
  questionText: { type: String, required: true, unique: true },
  options: { type: Array, required: true },
  correctOption: { type: String, required: true }},
  { 
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at'}
   }
);

const Question  = mongoose.model("Question", QuestionsSchema); 
module.exports = Question;