/** @format */

const express = require("express");
const router = express.Router();

const game = require("../controllers/game.controller.js");

router.post("/game/create", game.create);
router.get("/games", game.findAll);
// router.get("/games/search", game.searchOne);
router.get("/games/search/:name", game.searchOne);
router.get("/games/:name", game.findOne);


module.exports = router;