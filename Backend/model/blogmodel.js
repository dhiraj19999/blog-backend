const mongoose = require("mongoose");

const reqString = { type: String, required: true };
const reqNumber = { type: Number, required: true };

const blogSchema = mongoose.Schema({
    uniq_id: String,
  Title: reqString,
 /* Content: reqString,
  topic: reqString,
  dat:Number || String,
  catgeory:reqString,
  shortinfo: reqString,
 authorName:String,

  image:[],*/
  authorID: String,
  comments:[]
});

const BlogModel = mongoose.model("blogs", blogSchema);

module.exports = {
  BlogModel,
};