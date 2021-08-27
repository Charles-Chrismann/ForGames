/** @format */

const express = require("express");
const router = express.Router();
const security = require('../middlewares/security');
const answer = require("../controllers/answer.controller.js");

router.post("/answer/create", security.checkJWT, answer.create);
router.delete("/answer/delete", security.checkJWT, answer.delete);
router.put("/answer/update", security.checkJWT, answer.update);
router.get("/answers/:topicId", answer.findAllByTopic)

module.exports = router;