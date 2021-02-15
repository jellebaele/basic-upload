const mongoose = require("mongoose");
const { Schema } = mongoose;

const ImageSchema = new Schema({
  title: {
    type: String,
  },
  img: 
  {
      data: Buffer,
      contentType: String,
  }
});

module.exports = new mongoose.model('Image', ImageSchema)