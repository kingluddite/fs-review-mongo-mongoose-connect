// const express = require("express")
// const router = express.Router()
// const ctrlUsers = require("../controllers/users")

// /* GET users page. */
// router.get("/", ctrlUsers.index)

// module.exports = router



var express = require('express');
var router = express.Router();

// /* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;