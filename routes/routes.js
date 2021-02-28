const router = require("express").Router();

router.get("/", (req, res) => {
    res.send("<h1>Server API - Client side rendering</h1>");
  });

router.get("/uploads", (req, res) => {
  res.json({ test: "Succes" });
});

router.post("/uploads")

module.exports = router;
