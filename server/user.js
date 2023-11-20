require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
const bcrypt = require('bcrypt')
const router = express.Router()
const cors = require('cors');
router.use(express.urlencoded({ extended: false }))
router.use(express.json());
router.use(cors());

/////----user schema
const userSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },

});
const User = mongoose.model('User', userSchema);




/////routes----User

router.post('/signup-user', async (req, res) => {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);
    try {
        const user = await User.findOne({ email: req.body.email })
        console.log(user);
        if (!user) {
            // console.log(user);
            const newperson = new User(
                { ...req.body, password: hash }
            );
            try {

                const saveduser = await newperson.save();
                console.log(saveduser);
                res.status(200).json(saveduser)

            } catch (err) {
                console.log(err);
            }
        }
        else {

            res.status(200).json(0)
        }
    }
    catch (err) {
        console.log(err);
    }

});

router.post('/login-user', async (req, res) => {
    try {

        const user = await User.findOne({ email: req.body.email })
        console.log(user);
        // console.log(user.password);
        // console.log(req.body.password);
        if (user === null) {
            res.status(200).json(0)  //incorrect email
        } else {
            let isPasswordCorrect
            isPasswordCorrect = await bcrypt.compare(req.body.password[0], user.password);
            if (isPasswordCorrect) {
                res.status(200).json(1)  //correct
            }
            else
                res.status(200).json(-1)  //incorrect password
        }
    } catch (err) {
        console.log(err);
        res.status(200).json("error came")

    }
})
router.delete('/delete-user', async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email })
        if (user == null) {
            res.status(200).json(0)  // incorrect mail
        } else {
            let isPasswordCorrect
            isPasswordCorrect = await bcrypt.compare(req.body.password, user.password);
            if (isPasswordCorrect) {
                await User.findByIdAndDelete(user._id);
                res.status(200).json(1)  //user deleted
            }
            else
                res.status(200).json(2)  //incorrect password
        }
    } catch (err) {
        console.log(err);
        res.status(200).json("error aa gaya")

    }
})

router.put("/update-user", async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email })
        if (user == null) {
            res.status(200).json(0)  //user not found
        }
        else {
            const salt = bcrypt.genSaltSync(10);
            const hash = bcrypt.hashSync(req.body.password, salt);
            const userflight = await User.findByIdAndUpdate(user._id, { $set: { ...req.body, password: hash } }, { new: true });
            res.status(200).json(1)  //successfully updated
        }
    } catch (err) {
        console.log(err);
    }

})

module.exports = router