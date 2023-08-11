const mongoose = require("mongoose");
const shortid = require('shortid');

const urlSchema = new mongoose.Schema({
    longURL: { type: String, required: true },
    shortURL: { type: String, required: true, unique: true, default: shortid.generate }
})

module.exports = mongoose.model("urlData", urlSchema)