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

const image = mongoose.model('Image', ImageSchema);
module.exports = image;