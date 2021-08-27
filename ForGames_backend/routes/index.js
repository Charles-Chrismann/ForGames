/** @format */

const express = require("express");
const router = express.Router();

const authApi = require("./auth.route");
const gameApi = require("./game.route");
const topicApi = require("./topic.route");
const answerApi = require("./answer.route")
const userApi = require("./user.route")

router.use(authApi);
router.use(gameApi);
router.use(topicApi);
router.use(answerApi);
router.use(userApi);

module.exports = router;