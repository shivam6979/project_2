const express = require("express");
const router = express.Router();
const collegeController = require("../controllers/collegeController")
const internshipController = require("../controllers/internshipController")


// ===============  for college =========================

router.post("/createcollege", collegeController.createcollege)

router.get("/functionup/collegeDetails", collegeController.getCollegeDetails)

// router.get("/getInternWithCollegeDetails", collegeController.getInternWithCollegeDetails)


// ===============  for intern =========================

router.post("/Interns", internshipController.createIntern)


// if api is invalid or wrong

router.all("/*", function(req, res) {
    res.status(404).send({ status: false, msg: "The api you requested is not available" })
})


router.get("/test", function(req, res) {
    res.send("Programm is running ....!")
});
module.exports = router