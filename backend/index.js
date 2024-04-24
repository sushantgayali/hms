const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const adminRouter = require("./routes/admin")
const userRouter = require("./routes/user");
const cors = require('cors');
const db = require("./db");
require('dotenv').config();
app.use(cors());
// Middleware for parsing request bodies
app.use(bodyParser.json());
app.use("/admin", adminRouter)
app.use("/user", userRouter);

const PORT = process.env.PORT;


app.listen(process.env.PORT || 3000, () => {
    console.log(`Server is running on port ${PORT}`);
});
