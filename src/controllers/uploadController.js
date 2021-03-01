const multer = require("multer");
const path = require("path");
const util = require("util");
const Image = require("../models/Image");
const fs = require("fs");

let storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, path.join(`${__dirname}/../../upload`));
  },
  filename: (req, file, callback) => {
    const match = ["image/png", "image/jpeg"];

    if (match.indexOf(file.mimetype) === -1) {
      var message = `<strong>${file.originalname}</strong> is invalid. Only .png/.jpeg files are accepted`;
      return callback(message, null);
    }

    let filename = `${file.originalname}`;
    callback(null, filename);
  },
});

let uploadFiles = multer({ storage: storage }).array("multi-files", 10);
let uploadFilesHelper = util.promisify(uploadFiles);

const multipleUploads = async (req, res) => {
  try {
    await uploadFilesHelper(req, res);
    console.log(req.files);
    if (!req.files || req.files.length <= 0) {
      return res.send(`You must select at least 1 file.`);
    }

    await req.files.forEach((imgElement) => {
      const newImage = new Image(getImageObject(imgElement));
      const createdImage = newImage.save();
    });

    return res.send("File(s) succesfully uploaded");
  } catch (error) {
    if (error.code === "LIMIT_UNEXPECTED_FILE") {
      return res.send("Too many files to upload.");
    }
    console.log(error);
    return res.send(`Error when trying to upload: ${error}`);
  }
};

const getImageObject = (image) => {
  return (newImageObject = {
    title: image.filename,
    img: {
      data: fs.readFileSync(
        path.join(`${__dirname}/../../upload/` + image.filename), "base64"
      ),
      contentType: "image/png",
    },
  });
};

module.exports = {
  multipleUploads: multipleUploads,
};
