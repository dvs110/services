require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
const bcrypt = require('bcrypt')
const router = express.Router()
const cors = require('cors');
router.use(express.urlencoded({ extended: false }))
router.use(express.json());
router.use(cors());
const Stripe = require('stripe')
const stripe = Stripe(process.env.STRIPE_KEY)


///------worker schema
const nodemailer = require('nodemailer');
let transporter = nodemailer.createTransport({
    host: 'mail.google.com',
    port: 465,
    secure: true,
    service: 'gmail',

    auth: {
        user: process.env.EMAIL,
        pass: process.env.app_password,
    },
    tls: {
        rejectUnauthorized: false
    }
});
const workerSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    status: { type: Boolean, default: false },// available
    phone: { type: Number },
    work: { type: String },
    rating: { type: String, default: "5" },
    age: { type: Number },
    state: { type: String },
    city: { type: String },
    amount: { type: Number },
    photo: { type: String },
    name: { type: String },
    emaily: { type: String },
    address: { type: String },
    phony: { type: Number },
    time: { type: String },
    emailcustomer: { type: String }


});
const Worker = mongoose.model('Worker', workerSchema);



//////routes---worker

router.post('/signup-worker', async (req, res) => {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);
    try {
        const worker = await Worker.findOne({ email: req.body.email })
        if (worker == null) {
            const newworker = new Worker(
                { ...req.body, password: hash }
            );
            try {
                // console.log(newworker);


                const savedworker = await newworker.save();
                res.status(200).json(1)

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

})


router.post('/login-worker', async (req, res) => {
    try {

        const worker = await Worker.findOne({ email: req.body.email })
        if (worker == null) {
            res.status(200).json(0)  //incorrect email
        } else {
            let isPasswordCorrect
            isPasswordCorrect = await bcrypt.compare(req.body.password[0], worker.password);
            if (isPasswordCorrect) {

                res.status(200).json(1)
            }
            else
                res.status(200).json(-1)  //incorrect password
        }
    } catch (err) {
        console.log(err);
        res.status(200).json("error came")

    }
})
router.delete('/delete-worker', async (req, res) => {
    try {
        const worker = await Worker.findOne({ email: req.body.email })
        if (worker == null) {
            res.status(200).json(0)  // incorrect email
        } else {
            let isPasswordCorrect
            isPasswordCorrect = await bcrypt.compare(req.body.password, worker.password);
            if (isPasswordCorrect) {
                await Worker.findByIdAndDelete(worker._id);
                res.status(200).json(1)  //worker deleted
            }
            else
                res.status(200).json(-1)  //incorrect password
        }
    } catch (err) {
        console.log(err);
        res.status(200).json("error came")

    }
})


router.put("/update-worker", async (req, res) => {
    try {
        const worker = await Worker.findOne({ email: req.body.email })
        if (worker == null) {
            res.status(200).json(0)  //worker not found
        }
        else {
            const workerflight = await Worker.findByIdAndUpdate(worker._id, { $set: { ...req.body } }, { new: true });
            console.log(workerflight);
            res.status(200).json(workerflight)  //successfully updated
        }
    } catch (err) {
        console.log(err);
    }

})

router.put("/update-password", async (req, res) => {
    try {
        const worker = await Worker.findOne({ email: req.body.email })
        if (worker == null) {
            res.status(200).json(0)  //worker not found
        }
        else {
            const salt = bcrypt.genSaltSync(10);
            const hash = bcrypt.hashSync(req.body.password, salt);
            const workerflight = await Worker.findByIdAndUpdate(worker._id, { $set: { ...req.body, password: hash } }, { new: true });
            res.status(200).json(workerflight)  //successfully updated
        }
    } catch (err) {
        console.log(err);
    }

})
router.post("/findbyservice", async (req, res) => {
    const work = req.body.work //sorting according to service


    try {
        const workers = await Worker.find({ work: work });
        // console.log(workers);
        res.status(200).json(workers)
    } catch (err) {
        return next(err);
    }

})

router.put("/book-worker", async (req, res) => {
    // console.log(req.body);
    const worker = await Worker.findOne({ email: req.body.email })
    const workerflight = await Worker.findByIdAndUpdate(worker._id, { $set: { status: true } }, { new: true });

    await Worker.findByIdAndUpdate(worker._id, { $set: { name: req.body.name } }, { new: true });
    await Worker.findByIdAndUpdate(worker._id, { $set: { emaily: req.body.email } }, { new: true });
    await Worker.findByIdAndUpdate(worker._id, { $set: { address: req.body.address } }, { new: true });
    await Worker.findByIdAndUpdate(worker._id, { $set: { time: req.body.time } }, { new: true });
    await Worker.findByIdAndUpdate(worker._id, { $set: { phony: req.body.phone } }, { new: true });
    const workerflight1 = await Worker.findByIdAndUpdate(worker._id, { $set: { emailcustomer: req.body.emailcustomer } }, { new: true });



    // console.log(workerflight1);

    // for Worker
    // var mailOptions = {
    //     from: process.env.EMAIL,
    //     to: req.body.email,//email to be sended
    //     subject: "Regarding Booking",
    //     html: `<div className="outer-flight-div" style='max-width: 100vw;'><div className="flight-section" style='width:60%;background-color: blue;margin:auto;@media screen and (max-width:640px) {.flight-section{width:80%;}}'><h1 style='text-align: center;margin-top: 2rem;padding-top:4rem;@media screen and (max-width:640px) {h1{text-align: center;margin-top: 2rem;padding-top:3rem;}}'>Confirmed Booking</h1><p style='margin-top: 2rem;text-align: center;font-size: 1.2rem;font-weight: 600;@media screen and (max-width:640px) { .flight-section p{margin:1.2rem}}'>Customer Name: <span style='color:#0b1560;'>${workerflight1.name}</span></p><div className="flight-time" style='padding: 2rem 0;margin:auto; @media screen and (max-width:640px) {.flight-time{flex-direction: column; }}'>
    //     <div className="from"></div></div><div className="flight-footer-section" style='padding-bottom: 2rem;'><p>Time: ${workerflight1.time}</p><p>Phone Number:${workerflight1.phony}</p><p>Customer Address: ${workerflight1.address}</p></div></div></div></div>`  // html body
    // };
    // transporter.sendMail(mailOptions, (error, info) => {
    //     if (error) {
    //         return console.log(error);
    //     }
    //     console.log('Message sent: %s', info.messageId);
    //     console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    // });

    //for Customer

    // var mailOptions1 = {
    //     from: process.env.EMAIL,
    //     to: req.body.emailcustomer,//email to be sended
    //     subject: "Regarding Booking",
    //     html: `<div><h1 style='font-weight:bold'>Your Booking is confirmed</h1></div>`  // html body
    // };
    // transporter.sendMail(mailOptions1, (error, info) => {
    //     if (error) {
    //         return console.log(error);
    //     }
    //     console.log('Message sent: %s', info.messageId);
    //     console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    // });



})
router.post("/create-checkout-session", async (req, res) => {
    console.log(req.body);
    const { stripe_data } = req.body;
    // console.log(stripe_data);
    console.log(50);

    const lineItems = [{
        price_data: {
            currency: "inr",
            product_data: {
                name: req.body.w,
            },
            unit_amount: req.body.p * 100,
        },
        quantity: 1
    }];


    const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: lineItems,
        mode: "payment",
        success_url: "http://localhost:5173/success",
        cancel_url: "http://localhost:5173/fail",
    });
    console.log(session.url);
    res.json({ url: session.url })

})


router.put("/cancelbooking-worker/:id", async (req, res) => {

    const workerflight = await Worker.findByIdAndUpdate(req.params.id, { $set: { status: false } }, { new: true });
    var mailOptions = {
        from: process.env.EMAIL,
        to: "satidevang2001@gmail.com",//email to be sended
        subject: "INFOMATION",
        html: `<div><h1 style='font-weight:bold'>Booking Cancelled</h1></div>`  // html body
    };
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    });




    res.status(200).json(workerflight)  //successfully updated

})

module.exports = router
















// router.post('/create-checkout-session', async (req, res) => {
//     const session = await stripe.checkout.sessions.create({
//         line_items: [
//             {
//                 price_data: {
//                     currency: 'usd',
//                     product_data: {
//                         name: req.body.w,
//                     },
//                     unit_amount: req.body.p * 100,
//                 },
//                 quantity: 1,
//             },
//         ],
//         mode: 'payment',
//         success_url: 'http://127.0.0.1:5173',
//         cancel_url: 'http://localhost:8080/fail',
//     });

//     res.send({ url: session.url });
// });