const internshipModel = require("../models/internshipModel")


const isValidBody = function(body) {
    return Object.keys(body).length > 0
}

// +++++++++++++++++     1st api     ++++++++++++++++++++++++++
const createIntern = async function(req, res) {
    try {
        let intern = req.body //The req.body property contains key-value pairs of data submitted in the request -
            // -body. By default, it is undefined and is populated when you use a middleware called body-parsing -
            //- such as express.urlencoded() or express.json().

        if (!isValidBody(intern)) {
            return res.status(404).send({ status: false, message: "please provide mandatory info" })
        }


        let { name, email, mobile, collegeId } = intern

        if ((!name)) {
            return res.status(404).send({ status: false, message: "please provide ntern name" })
        }


        if ((!/^[a-zA-Z ]{3,}$/.test(name))) {
            return res.status(404).send({ status: false, message: "please provide  valid name" })
        }



        if ((!email)) {
            return res.status(404).send({ status: false, message: "please provide email" })
        }

        if ((!/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/.test(email))) {
            return res.status(404).send({ status: false, message: "please provide valid email" })
        }


        if ((!mobile)) {
            return res.status(404).send({ status: false, message: "please provide mobile numer" })
        }


        if ((!/^[0-9]{10}$/.test(mobile))) {
            return res.status(404).send({ status: false, message: "please provide  valid mobile numer" })
        }

        if ((!collegeId)) {
            return res.status(404).send({ status: false, message: "please provide collegeId" })
        }

        // if ((!collegeId)) {
        //     return res.status(404).send({ status: false, message: "please provide valid collegeId" })
        // }


        // if ((!collegeId)) {
        //     return res.status(404).send({ status: false, message: "please provide mandatory info" })
        // }
        let createIntern = await internshipModel.create(intern)
        return res.status(200).send({ status: true, message: createIntern })

    } catch (err) {
        return res.status(500).send({ message: "error", error: err.message })
    }
};
module.exports.createIntern = createIntern