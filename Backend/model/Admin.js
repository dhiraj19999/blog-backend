const mongoose = require("mongoose");

const reqString = { type: String, required: true };
const reqNumber = { type: Number, required: true };

const AdminSchema = mongoose.Schema({
 Name:reqString,
  email: reqString,

  mobile: reqNumber,
  password: reqString,
  avatar: { type: String, default: "" },
});

const AdminModel = mongoose.model("admin", AdminSchema);

module.exports = {
  AdminModel,
};