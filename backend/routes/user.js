const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const {User,Admin,Course} = require("../db");
const jwt = require('jsonwebtoken');
const { error } = require("console");
const secret = "pranavkumar";


// User Routes
router.post('/signup', async(req, res) => {
    // Implement user signup logic
    const username  = (req.body.username);
    const password  = req.body.password;
    const patientName = req.body.patientName;
    const contactNu = req.body.contactNu;
    console.log(username , password);

     await User.create({
        username : username ,
        password : password,
        patientName : patientName ,
        contactNu : contactNu ,

    });
    res.json({msg : "User is created"});

});

router.post('/signin', async(req, res) => {
    // Implement admin signup logic
    const username  = req.body.username ;
    const password =  req.body.password;
    User.findOne({ username: username, password: password })
    .then((user) => {
        if (!user) {
            // If user is not found, send a response indicating failure
            res.status(400).json({ msg: "Invalid username or password. Please try again." });
        } else {
            // User found, send a success response
            res.status(200).json({ msg: "Login successful" });
        }
    })
    .catch((error) => {
        // Error occurred while querying the database
        console.error(error);
        res.status(500).json({ msg: "Internal server error" });
    });
});



module.exports = router