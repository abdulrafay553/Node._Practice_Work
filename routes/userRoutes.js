const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')

const jsonparser = bodyParser.json()
const urlendcoded = bodyParser.urlencoded({ exntended: false })

const UserConroller1 = require('../controllers/userController')

router.get("/saveuser", urlendcoded, UserConroller1.saveUserForm)
router.post("/saveuser", urlendcoded, UserConroller1.saveUser)

router.get("/loginuser", urlendcoded, UserConroller1.loginUserForm)
router.post("/loginuser", urlendcoded, UserConroller1.loginUser)

router.get("/testuser", urlendcoded, UserConroller1.testUser)
router.get("/testcookies", urlendcoded, UserConroller1.testCookies)
router.get("/testtoken", urlendcoded, UserConroller1.testToken)

router.post("/edituser", urlendcoded, UserConroller1.editUser)
router.get("/allusers", urlendcoded, UserConroller1.showAllUsers)
router.post("/deleteuser", urlendcoded, UserConroller1.deleteUser)

router.get("/sendEmail", urlendcoded, UserConroller1.sendEmail)

router.get("/", (req, res) => {
    res.send("<h1>Welcome to Login Page</h1>")
})

module.exports = router
