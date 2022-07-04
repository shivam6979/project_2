const collegeModel = require("../models/collegeModel");
const internShipModel = require("../models/internshipModel");

const isValidBody = function(body) {
    return Object.keys(body).length > 0
}

const isValid = function(value) {
    if (typeof value === 'undefined' || value === null) return false
    if (typeof value != "string") return false
    if (typeof value === 'string' && value.trim().length === 0) return false
    return true
}


//create
const createcollege = async function(req, res) {
    try {
        let college = req.body;

        // /^[a-zA-Z ]{2,30}$/
        if (!isValidBody(college)) {
            return res.status(404).send({ status: false, message: "please provide mandatory info" })

        }

        let { name, fullName, logoLink } = college;


        // ////////////////
        if (!name) {
            return res.status(404).send({ status: false, message: "please provide College name" })
        }

        // ///////////////////
        if (!/^[a-zA-Z ]{3,}$/.test(name)) {
            return res.status(404).send({ status: false, message: "please enter Valid College name" })
        }

        // //////////////////
        let availableName = await collegeModel.findOne({ name: name })
        if (availableName) {
            return res.status(404).send({ status: false, message: "A College with this Name is already registered" })
        }


        // //////////////
        if (!fullName) {
            return res.status(404).send({ status: false, message: "please provide College fullName" })
        }

        // /////////
        if (!/^[a-zA-Z ]{6,}$/.test(fullName)) {
            return res.status(404).send({ status: false, message: "please provide Valid College fullName" })
        }


        // //////////
        let availableFullName = await collegeModel.findOne({ fullName: fullName })
        if (availableFullName) {
            return res.status(404).send({ status: false, message: "A College with this Full Name is already registered" })
        }



        if (!logoLink) {
            return res.status(404).send({ status: false, message: "please provide College Logo Link" })
        }

        let availablelogoLink = await collegeModel.findOne({ logoLink: logoLink })
        if (availablelogoLink) {
            return res.status(404).send({ status: false, message: "This logo Link is already in used" })
        }


        let collegeCreated = await collegeModel.create(college)
        res.status(201).send({ status: true, message: collegeCreated });


    } catch (err) {
        return res.status(500).send({ message: "error", Erroe: err.message })
    }
}

module.exports.createcollege = createcollege;


// ---------------------------------------------------------


const getCollegeDetails = async function(req, res) {
    try {
        let query = req.query

        if (!isValidBody(query)) {
            return res.status(400).send({ status: false, message: "Provide details" })
        }


        if (!isValid(query.collegeName)) {
            return res.status(400).send({ status: false, message: "Provide valid query" })

        }
        const college = await collegeModel.findOne({ name: query["collegeName"] })

        if (!college) {
            return res.status(404).send({ status: false, message: "college not found" })
        }

        const interns = await internShipModel.find({ collegeId: college._id }).select({ name: 1, email: 1, mobile: 1 })

        if (interns == 0) {
            return res.status(404).send({ status: false, message: "no interns found in given college" })
        }
        res.status(200).send({
            status: true,
            "data": { "name": college.name, "fullName": college.fullName, "logoLink": college.logoLink, "interns": interns }
        })

    } catch (err) {
        return res.status(500).send({ status: false, message: err.message })
    }
}

module.exports.getCollegeDetails = getCollegeDetails;





// const getCollegeDetails = async function(req, res) {
//     try {
//         const college = await collegeModel.findOne({
//             isdeleted: false,
//             collegeName:
//         });


//         if (!college) {
//             return res.status(400).send({ status: false, message: "no college found" })
//         }
//         return res.status(200).send({ status: true, data: { college } })



//     } catch (err) {
//         return res.status(500).send({ status: false, error: err.message })
//     }

// }
// console.log("notok")



// const getInternWithCollegeDetails = async function(req, res) {
//     try {
//         // let specialIntern = await collegeModel.find().populate("college_id")

//         let name = req.body
//         const college = await collegeModel.findOne({
//             isdeleted: false,
//             collegeName: name
//         });

//         let collegeId = req.body.collegeId
//         let intern = await internShipModel.findById({ collegeId })

//         if (!intern) {
//             return res.status(400).send({ status: false, message: "no intern found" })
//         }
//         res.status(200).send({
//             status: true,
//             data: {
//                 college,
//                 college: [intern]

//             }
//         })
//     } catch (err) {
//         return res.status(500).send({ status: false, error: err.message })
//     }
// }

// // module.exports.getCollegeDetails = getCollegeDetails


// module.exports.getInternWithCollegeDetails = getInternWithCollegeDetails