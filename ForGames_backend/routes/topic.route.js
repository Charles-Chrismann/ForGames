/** @format */

const express = require("express");
const router = express.Router();
const security = require('../middlewares/security');
const topic = require("../controllers/topic.controller.js");

router.post("/topic/create", security.checkJWT, topic.create)
router.get("/game/:gameName/topics", topic.findAllByGameName)
router.get("/topics/:gameId", topic.findAllByGame)
router.get("/topics", topic.findAll)
router.get("/topic/:topicId", topic.findTopicById)

module.exports = router;