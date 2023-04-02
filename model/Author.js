const mongoose = require("mongoose");

const reqString = { type: String, required: true };
const reqNumber = { type: Number, required: true };

const authorSchema = mongoose.Schema({
  Name: reqString,
  
  email: reqString,

  mobile: reqNumber,
  password: reqString,

});

const AuthorModel = mongoose.model("Author", authorSchema);

module.exports = {
  AuthorModel,
};