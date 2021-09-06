/** @format */

const { Game } = require("../models")
var Sequelize = require("sequelize");
const Op = Sequelize.Op

exports.create = async (req, res) => {
    console.log("-----game.create-----")
    const { name }  = req.body;
    console.log(req.body)
    console.log(name)
    const newGame = await new Game({
        name
    });

    const alreadyExistsGame = await Game.findOne({
        where: { name: req.body.name },
      }).catch((err) => {
        console.log("Error : ", err);
    });

    if (alreadyExistsGame) {
        return res.json({
          message: "Game already created",
        });
    }

    newGame.save()
    .then((response) => {
        res.json({ message: "Game created" });
      })
      .catch((err) => {
        console.log("Error : ", err);
        res.json({
          error: "Game not created, something went wrong...",
        });
      });
}

exports.findAll = async (req, res) => {
  console.log("-----game.findAll-----");
    Game.findAll()
    .then((Game) => {
        res.status(200).send(Game)
    })
    .catch((err) => {
        if (err) {
          console.log(err);
        }
      });
}

exports.findOne = (req, res) => {
  console.log("-----game.findOne-----");
    Game.findOne({where: { name: req.params.name}, include: ['topics']})
    .then((Game) => {
        res.status(200).send(Game)
    })
    .catch((err) => {
        if (err) {
          console.log(err);
        }
      });
}

exports.searchOne = (req, res) => {
  console.log("-----game.searchOne-----")
  const name = req.params.name;
  console.log(name)

  Game.findAll({where: { name: {[Op.startsWith]: req.params.name }}, attributes: ['name']})
  .then((Games) =>{
    console.log(Games)
    res.status(200).send(Games)
  })
  .catch((err) => {
    if (err) {
      console.log(err);
    }
  });

}