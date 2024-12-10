const mongoose = require('mongoose');

const Schema = mongoose.Schema
const NoteSchema = new Schema ({
  userId: {
      type: mongoose.Schema.Types.ObjectId, // Links the note to a user
      ref: "IDKman", // Reference to the user model
      required: true,
  },
  title: {
      type: String,
      required: true,
  },
  content: {
      type: String,
      required: true,
  },
  createdAt: {
      type: Date,
      default: Date.now(),
  },
},  { collection: 'Notes' });


const Note = mongoose.model("Note", NoteSchema);

module.exports = Note;  // Export the Note model for use elsewhere
