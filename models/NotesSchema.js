const mongoose = require("mongoose");

const NotesSchema = new mongoose.Schema({
    title: String,
    desc: String,
    addDate: String
});

const Notes = mongoose.model('note', NotesSchema);

module.exports = Notes;