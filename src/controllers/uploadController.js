const multer = require("multer");
const path = require("path");
const util = require("util");

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

    var filename = `${Date.now()}${file.originalname}`;
    callback(null, filename);
  },
});

let uploadFiles = multer({ storage: storage }).array("multi-files", 10);
let uploadFilesHelper = util.promisify(uploadFiles);

const multipleUploads = async (req, res) => {
  try {
    await uploadFilesHelper(req, res);

    console.log(req.files);

    if (req.files.length <= 0) {
      return res.send(`You must select at least 1 file.`);
    }

    return res.send(`File(s) uploaded.`);

  } catch (error) {
    console.log(error);

    if (error.code === "LIMIT_UNEXPECTED_FILE") {
      return res.send("Too many files to upload.");
    }
    return res.send(`Error when trying upload many files: ${error}`);
  }
};

module.exports = {
    multipleUploads: multipleUploads
};
