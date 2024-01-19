const express = require("express");
const bodyParser = require("body-parser");
const app = express();
// const cors = require("cors");
const { signup, userDetails } = require("./types");
const { user,userDetail } = require("./db");
const bcrypt = require('bcryptjs')
app.use(express.json());
// app.use(cors());
app.use(bodyParser.json());

const saltRounds = 8;

app.post("/signup",async (req,res) => {
    const createPayload = req.body;
    const parsePayload = signup.safeParse(createPayload);
    if(!parsePayload.success){
        res.status(411).json({msg: parsePayload})
    }
    else{
        const salt = bcrypt.genSaltSync(saltRounds);
        const hashedPassword = bcrypt.hashSync(createPayload.password, salt);
        await user.create({
            phone : createPayload.phone,
            email : createPayload.email,
            password : hashedPassword
        })
        res.json({msg : "success"})
    }
})

app.post("/login", async (req, res) => {
    const createPayload = req.body;
    const user1 = await user.findOne({
        phone: createPayload.phone,
    });

    if (!user1) {
        res.json("Username or password incorrect!");
    } else {
        const storedHashedPassword = user1.password;
        const passwordMatch = bcrypt.compareSync(createPayload.password, storedHashedPassword);

        if (passwordMatch) {
            res.json("User authenticated!");
        } else {
            res.json("Username or password incorrect!");
        }
    }
});

app.post("/addUser", async (req,res) => {
    const createPayload = req.body;
    const parsePayload = userDetails.safeParse(createPayload);
    if(!parsePayload.success){
        res.send({msg: "Wrong inputs send"})
    }
    else{
        console.log(parsePayload)
        await userDetail.create(createPayload);
        res.json({msg : "Successful"})
    }
})

app.listen(3040)