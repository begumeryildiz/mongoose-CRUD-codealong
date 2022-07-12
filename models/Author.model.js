const { Schema, model } = require("mongoose");

const authorSchema = new Schema(
  {
    name: String,
    age: Number,
    country: String,
  }
)

const Author = model("Author", authorSchema);
