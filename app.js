//Initialzing Packages
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");
const mongoose = require("mongoose");
const request = require("request");
const bcrypt = require("bcrypt");
const app = express();
const nodemailer = require("nodemailer");
const User = require("./models/user");
const UserBankDetails = require("./models/user_bank_details");

//Application Settings
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

//Database  Connection
mongoose.connect("mongodb://localhost:27017/pinaco");

//Initialize Global Variables
let generatedOTP;
let panNumber;

//Handling Routes

//For Home
// app.route("/home").get(function (req, res) {
//   res.render("home");
// });

//For Registration
app
  .route("/")

  .get(function (req, res) {
    res.render("register");
  })

  .post(function (req, res) {
    const saltRounds = 10;
    
    bcrypt.hash(req.body.createpassword, saltRounds, function (err, hash) {
      // Store hash in your password DB.
      console.log(req.body);
        const newUser = new User({
          username: req.body.username,
          pancard: req.body.pancard,
          emailaddress: req.body.emailaddress,
          number: req.body.number,
          password: hash,
        });
        newUser.save(function (err) {
          if (!err) {
            // console.log(newUser)
          UserBankDetails.findOne({pan_number:req.body.pancard},function(err,foundUser){
            if(err){
              console.log(err)
            }else{
              if(foundUser){
                console.log(foundUser.banks)
                console.log(foundUser.Stocks)
                console.log(foundUser.MutualFunds)
                res.render("home",{banks:foundUser.banks,stocks:foundUser.Stocks,mutualFunds:foundUser.MutualFunds});

              }else{
                console.log("Not Found")
              }
            }
          })
            
          } else {
            res.send(err);
          }
        });
    });
  });

//For OTP

app
  .route("/OTP")
  .post(function (req, res) {
    const otp1 = req.body.otp1;
    // console.log(typeof(otp1))
    const otp2 = req.body.otp2;
    const otp3 = req.body.otp3;
    const otp4 = req.body.otp4;
    const otp5 = req.body.otp5;
    const otp = otp1.concat(otp2, otp3, otp4, otp5);
    if (otp === generatedOTP.toString()) {
      console.log("Success OTP")
      UserBankDetails.findOne({pan_number:panNumber},function(err,foundUser){
        if(err){
          console.log(err)
        }else{
          // console.log(req.body)
          if(foundUser){
            console.log(foundUser.banks)
            console.log(foundUser.Stocks)
            console.log(foundUser.MutualFunds)
            res.render("home",{banks:foundUser.banks,stocks:foundUser.Stocks,mutualFunds:foundUser.MutualFunds});

          }else{
            console.log("Not Found")
          }
        }
      })
    }else{
      console.log(typeof(otp))
      console.log(typeof(generatedOTP))
      console.log("Wrong OTP")
    }
  });

//For Logout


//For Login

app
  .route("/login")
  .get(function (req, res) {
    res.render("register");
  })
  .post(function (req, res) {
    // console.log(req.body)
    const username = req.body.username;
    panNumber=req.body.pan_number;
    // const password = md5(req.body.password) //////md5  method

    User.findOne({ username: username }, function (err, foundUser) {
      if (err) {
        console.log(err);
      } else {
        if (foundUser) {
          // if(foundUser.password===password){
          //     res.render("secrets")
          // }
          bcrypt.compare(
            req.body.password,
            foundUser.password,
            function (err, result) {
              if (result) {
                //OTP Handling
                generatedOTP = Math.floor(10000 + Math.random() * 90000);
                var transporter = nodemailer.createTransport({
                  service: "gmail",
                  auth: {
                    user: "YOUR_EMAIL",
                    pass: "YOUR_PASSWORD",
                  },
                });

                var mailOptions = {
                  from: "aumshiva.ramabishoyi2020@vitstudent.ac.in",
                  to: foundUser.emailaddress,
                  subject: "OTP Verification CeBank",
                  text: "Your OTP is " + generatedOTP.toString(),
                };

                transporter.sendMail(mailOptions, function (error, info) {
                  if (error) {
                    console.log(error);
                  } else {
                    console.log("Email sent: " + info.response);
                  }
                });
                res.render("OTP");
              }else{
                res.write("<h1>Not valid credentials</h1>");
              }
            }
          );
        } else {
          console.log("Not Found");
          res.write("<h1>User not found</h1>");
        }
      }
    });
  });

app.listen(8000, function () {
  console.log("Server started on port 8000");
});
