const express = require('express')
const router = express.Router()
var bodyParser = require("body-parser");
const { extend } = require('lodash')

const { User } = require('../models/userModel.js')

router.use(bodyParser.json());

router.route("/")
.get(async (req, res) => {
  try{
    const users = await User.find({})
    res.json({ success: true, users })
  }
  catch(err) {
    res.status(400).json({
      success: false,
      message: "There was some error retrieving Quiz User Data",
      errorMessage: err.message
    })
  }
})
.post(async (req,res) => {
  try{
    const { userName, score } = req.body
    const newUser = new User({ userName, score })

    await newUser.save()

    res.status(201).json({ success: true, newUser: newUser})
  } catch(err) {
    res.status(500).json({
      success: false,
      message: "This username already exists",
      errorMessage: err.message
    })
  }
})


router.param("userName", async(req, res, next, userName) => {
  try{
    const user = await User.find({userName: userName})
    if(!user[0])
      return res.status(400).json({ status: false, message: "Error getting userName"})

    req.user = user[0]
    next()
  } catch(err) {
    res.status(400).json({ status: false, message: err.message})
  }
})

router.route("/:userName")
.get(async (req,res) => {
  try{
    const { user } = req
    user.__v = undefined
    res.json({ success: true, user })
  } catch(err) {
    res.status(500).json({
      success: false,
      message: `There was some error getting data of ${user.userName} `,
      errorMessage: err.message
    })
  }
})

.post(async (req, res) => {
  try{
    const updatedScore = req.body
    let { user } = req

    user = extend(user, updatedScore)
    await user.save()

    res.json({ success: true, user })
  } catch(err) {
    res.status(500).json({
      success: false,
      message: "There was some error updating user score",
      errorMessage: err.message
    })
  }
})

.delete(async (req,res) => {
  let { user } = req;

  user = await user.delete()

  res.json({ succes: true, DeletedUser: user})
})





module.exports = router;