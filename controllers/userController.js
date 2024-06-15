const bcrypt = require('bcrypt')
const userModelLib = require('../model/userModel')
const jwt = require('jsonwebtoken')
const nodemailer = require("nodemailer");

// exports.saveUser = (req, res) => {
//     // console.log(req.body)
//     const newuser = new userModelLib(req.body);
//     newuser.save().then((data) => {
//         console.log(data)
//         console.log("Record Saved ....")
//         res.send(200)
//     }).catch((err) => {
//         console.log("Record Not Saved ...." + err)
//         res.send(404)
//     })
// }

exports.saveUser = async (req, res) => {
    try {
        const { username, useremail, userpassword } = req.body;

        // Hash the password
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hashSync(userpassword, saltRounds);

        // Generate a unique token
        const secretKey = 'qwerty';
        const uniqueToken = jwt.sign({ username, useremail }, secretKey);

        const newuser = new userModelLib({
            username,
            useremail,
            userpassword: hashedPassword,
            token: uniqueToken
        });

        const data = await newuser.save();
        console.log(data);
        console.log("Record Saved ....");
        res.sendStatus(200);
    } catch (err) {
        console.log("Record Not Saved ...." + err);
        res.sendStatus(404);
    }
};

exports.saveUserForm = (req, res) => {
    res.render('userform')
}

exports.testUser = (req, res) => {
    res.send('BRYPT TESTING')
    const saltRounds = 10;
    const myPassword = "abc"

    const salt = bcrypt.genSaltSync(saltRounds)
    console.log(salt)

    const hash = bcrypt.hashSync(myPassword, saltRounds)
    console.log(hash)

    const comp = bcrypt.compareSync('abc', hash)
    console.log(comp)

}

exports.testCookies = (req, res) => {
    res.cookie('test1', 'test_information')
    console.log(req.cookies)
    res.send(200)
}

exports.testToken = (req, res) => {
    try {
        var secretkey = 'qwerty'
        var jtoken = jwt.sign({ username: 'abc', useremail: 'abc@gmail.com' }, secretkey)
        console.log(jtoken)

        var jverify = jwt.verify(jtoken, secretkey)
        console.log(jverify)

        res.send(200)
    } catch (err) {
        res.send(404)
    }
}

exports.editUser = (req, res) => {
    // console.log(req.body)
    // const newuser = new userModelLib(req.body);
    var filter = { username: req.body.username }
    userModelLib.updateMany(filter, req.body).then((data) => {
        console.log(data)
        console.log("Record Updated....")
        res.send(200)
    }).catch((err) => {
        console.log("Record Not Update ...." + err)
        res.send(404)
    })
}

exports.deleteUser = (req, res) => {
    // console.log(req.body)
    // const newuser = new userModelLib(req.body);
    // var filter = {username: 'admin2', useremail: 'gmail.com'}
    var filter = { username: req.body.username }
    userModelLib.deleteMany(filter).then((data) => {
        console.log(data)
        console.log("Record Deleted....")
        res.send(200)
    }).catch((err) => {
        console.log("Record Not Found ...." + err)
        res.send(404)
    })
}

exports.showAllUsers = (req, res) => {
    userModelLib.find().then((data) => {
        res.send(data)
    }).catch((err) => {
        res.send(err)
    })
}

exports.loginUser = async (req, res) => {
    var fingFlag = await userModelLib.findOne({ username: req.body.username }).then((vdata) => {
        console.log('Username Found...')
        console.log(vdata)
        try {
            var vFindPass = bcrypt.compare(req.body.userpassword, vdata.userpassword)
                .then((vfind) => {
                    console.log('Password matched: ' + vfind)
                    // Save Cookies
                    res.cookie('user_token', vdata.token)

                    res.render('home', { name: req.body.username })
                }).catch((err) => {
                    console.error(err)
                })
        }
        catch (err) {
            console.error(err)
        }
    }).catch((err) => {
        res.send(err)
    })
}

exports.loginUserForm = (req, res) => {
    res.render('loginuser')
}

exports.sendEmail = async (req, res) => {
    try {
        let testAccount = await nodemailer.createTestAccount();

        let transporter = await nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            auth: {
                // user: 'leola.beer@ethereal.email',
                // pass: 'V1ndk1USqyFFBar4zr',
                user: 'rafych54@gmail.com',
                pass: 'xzboxzodsnljvbgr',
            },
        });

        let info = await transporter.sendMail({
            from: "Abdul Rafay",
            to: "flyovercake@gmail.com", // Corrected the email address format
            subject: "Hi Rafay ✔",
            text: "I am nodemailer... Can you receive the mail",
            html: "<b>Hello world?</b>",
        });

        console.log("Message sent: %s", info.messageId);
        res.json(info);
    } catch (error) {
        console.error("Error sending email:", error);
        res.status(500).json({ error: "Error sending email" });
    }
};

