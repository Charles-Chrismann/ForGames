/** @format */

const { Topic, Game, User } = require("../models")
//const User = sequelize.define('user', { username: DataTypes.STRING });//, { timestamps: false }
const jwt = require("jsonwebtoken");

exports.create = async (req, res) => {
  console.log("-----topic.create-----");
  const { title, content, GameName }  = req.body;
  console.log(title, content)
  var headerAuth = req.headers['authorization'];
  UserId = jwt.decode(headerAuth.split(" ")[1]).id
  console.log(UserId)
  a = await Game.findOne({ where: { name: GameName}})
  GameId = a.id
  console.log(GameName + " id : " + GameId)
  const newTopic = new Topic({
      title,
      content,
      UserId,
      GameId
  });
  //console.log(newTopic)
  newTopic.save()
  .then((response) => {
      res.json({ message: "Topic created" });
    })
    .catch((err) => {
      console.log("Error : ", err);
      res.json({
        error: "Topic not created, something went wrong...",
      });
    });
}

// exports.delete = async (req, res) => {
//   
// }

exports.findAllByGame = async (req, res) => {
  console.log("-----topic.findAllByGame-----");
  const gameId = req.params.gameId;
    Topic.findAll({ where: { gameId: gameId}})
    //Topic.findAll({where:{GameId: gameId},include: { model: User, where: {id: Sequelize.col('Topic.UserId')}}})  // where: { gameId: gameId}, include: { model: User }})
    .then((Topics) => {
      console.log(Topics)
      res.status(200).send(Topics)
    })
    .catch((err) => {
        if (err) {
          console.log(err);
        }
      });
}

// SELECT * FROM topic INNER JOIN game ON topic.gameId = game.id WHERE game.name = gameName

exports.findAllByGameName = async (req, res) => {
  console.log("-----topic.findAllByGameName-----");
  const gameName = req.params.gameName;
  console.log(gameName)
  const game = await Game.findOne({ where: { name: gameName}})
  if (!game) {res.status(404).send({message:"Jeu inexistant dans la bdd"})}
  console.log(game)
    Topic.findAll({ 
      where: { gameId: game.id}, 
      attributes: ["id","title", "content", "createdAt"], 
      include: { model: User, attributes: ["username"]}, 
      order: [['createdAt', 'DESC']]
    })
    .then((Topics) => {
      res.status(200).send(Topics)
    })
    .catch((err) => {
        if (err) {
          console.log(err);
        }
      });
}

exports.findAll = async (req, res) => {
  console.log("-----topic.findAll-----");
    Topic.findAll({ 
      attributes: ["id","title", "content", "createdAt"],
      include: [{ model: User, attributes: ["username"]}, { model: Game, attributes: ["name"]} ],
      // include: { model: Game, attributes: ["name"]},
      order: [['createdAt', 'DESC']]
    })
    .then((Topics) => {
      res.status(200).send(Topics)
    })
    .catch((err) => {
        if (err) {
          console.log(err);
        }
      });
}

exports.findTopicById = async (req, res) => {
  console.log("-----topic.findTopicById-----");
  const topicId = req.params.topicId;
  console.log(topicId)
  Topic.findOne({ 
    where: { id: topicId},
    include:  {model: User, attributes: ["username"]}

  })
  .then((Topic) => {
    res.status(200).send(Topic)
  })
  .catch((err) => {
      if (err) {
        console.log(err);
      }
    });
  // if (!topic) {
  //   res.status(404).send({message:"Jeu inexistant dans la bdd"}
  // )}
  
}