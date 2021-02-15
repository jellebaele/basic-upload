const multer = require("multer");
const path = require("path");
const util = require("util");
const ImageModel = require("../models/Image");
const fs = require("fs");

let storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, path.join(`${__dirname}/../../upload`));
  },
  filename: (req, file, callback) => {
    const match = ["image/png", "image/jpeg"];

    if (match.indexOf(file.mimetype) === -1) {
      var message = `<strong>${file.originalname}</strong> is invalid. Only accept png/jpeg.`;
      return callback(message, null);
    }

    var filename = `${file.originalname}`;
    callback(null, filename);
  },
});

let uploadFiles = multer({ storage: storage }).array("multi-files", 10);
let uploadFilesHelper = util.promisify(uploadFiles);

const multipleUploads = async (req, res) => {
  try {
    await uploadFilesHelper(req, res);
    if (req.files.length <= 0) {
      return res.send(`You must select at least 1 file.`);
    }

    //console.log("Size " + req.files.length);
    //console.log(req.files[0].fieldname);
    //console.log(req.files[0].filename);
    //console.log("PATH: " + path.join(`${__dirname}/../../upload`));
    req.files.forEach(imgElement => {
      console.log(imgElement)
      let newImage = createNewImageModel(imgElement);
      ImageModel.create(newImage, (err, item) => {
        if (err) {
          console.log(err);
        } else {
          item.save();
        }
      });
    });

    return res.send("File(s) succesfully uploaded");
  } catch (error) {
    if (error.code === "LIMIT_UNEXPECTED_FILE") {
      return res.send("Too many files to upload.");
    }
    console.log(error);
    return res.send(`Error when trying upload many files: ${error}`);
  }
};

const createNewImageModel = (image) => {
  return newImage = {
    title: image.filename,
    img: {
      data: fs.readFileSync(
        path.join(`${__dirname}/../../upload/` + image.filename)
      ),
      contentType: "image/png",
    },
  };
}

module.exports = {
  multipleUploads: multipleUploads,
};