const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const { User , Admin  , Course} = require('../db');
const router = Router();
const jwt = require('jsonwebtoken');
const { stringify } = require("querystring");


// Admin Routes
router.post('/signup', async(req, res) => {
    // Implement admin signup logic
    const username  = (req.body.username);
    const password  = req.body.password;
    console.log(username , password);

     await Admin.create({
        username : username ,
        password : password
    });
    res.json({msg : "admin is created"});
});

router.post('/signin', async (req, res) => {
    const username  = req.body.username;
    const password =  req.body.password;
    const payload = { username };
    const token = jwt.sign(payload, secret);

    const user = await Admin.findOne({ username: username });

    let responseStatus, responseMessage;

    if (user) {
        responseStatus = 200;
        responseMessage = { msg: "signIn successful", Token: token };
    } else {
        responseStatus = 400;
        responseMessage = { msg: "failed at signin, signup once again" };
    }

    res.status(responseStatus).send(responseMessage);
});  



module.exports = router;