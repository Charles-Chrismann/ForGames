/** @format */

const express = require("express");
const router = express.Router();
const security = require('../middlewares/security');

const user = require("../controllers/user.controller.js");

router.put("/user/update", user.updateUser);
router.get("/user",security.checkJWT, user.getUser);


module.exports = router;