const router = require("express").Router();

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});


// router.get("/pizza", (req, res, next) => {
//   res.send("this is the pizza page")
// })

module.exports = router;
