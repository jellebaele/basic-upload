const router = require("express").Router();
const uploadController = require("../controllers/uploadController");
const ImageModel = require("../models/Image");

router.get("/", (req, res) => {
  res.send("<h1>Server API - Client side rendering</h1>");
});

router.get("/uploads", (req, res) => {
  ImageModel.find({}, (err, items) => {
    if (err) {
      res.status(500).send("An error occurred: ", err);
    } else {
      items.forEach((element) => {
        console.log(element.img);
      });
      res.json(items);
    }
  });
});

router.post("/uploads", uploadController.multipleUploads);

module.exports = router;
