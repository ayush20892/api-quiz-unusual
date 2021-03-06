const express = require('express')
const router = express.Router()

const { Quiz } = require('../models/quizModel.js')

router.route("/")
.get(async (req, res) => {
  try{
    const quiz = await Quiz.find({})
    res.json({ success: true, quiz })
  }
  catch(err) {
    res.status(400).json({
      success: false,
      message: "There was some error retrieving Quiz Data",
      errorMessage: err.message
    })
  }
})


router.route("/:quizName")
.get(async (req, res) => {
  try {
    const { quizName } = req.params
    const quiz = await Quiz.find({ quizName: quizName })
    res.json({ success: true, quiz: quiz })
  } catch(err) {
    res.status(400).json({
      success: false,
      message: "There was some error retrieving Quiz Data",
      errorMessage: err.message
    })
  }
})



module.exports = router;