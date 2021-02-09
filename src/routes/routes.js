const router = require("express").Router();
const uploadController = require("../controllers/uploadController")

router.get("/", (req, res) => {
    res.render("index.ejs");
});

router.post("/upload", uploadController.multipleUploads);

module.exports = router;