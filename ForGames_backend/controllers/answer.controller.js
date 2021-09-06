/** @format */

const { Answer, User, Topic } = require("../models")
const jwt = require("jsonwebtoken");

exports.create = async (req, res) => {
    console.log("-----answer.create-----");

    // Recuperation de l'Id du topic cible et du contenu de la réponse depuis le corps de la requete
    const { TopicId, content }  = req.body;

    // Recuperation de l'Id de l'utilisateur le header de la requete
    var headerAuth = req.headers['authorization'];
    UserId = jwt.decode(headerAuth.split(" ")[1]).id    // split : "Bearer TOKEN" => Decode => { id: }

    // Construction du message a envoyer
    const newAnswer = await new Answer({
        TopicId,
        content,
        UserId,
    });

    // Envoie du message
    newAnswer.save()
    .then((response) => {
        res.json({ message: "Answer sent" });
      })
      .catch((err) => {
        console.log("Error : ", err);
        res.json({
          error: "Answer not sent, something went wrong...",
        });
    });
}

exports.delete = async (req, res) => {
    console.log("-----answer.delete-----");

    // Recuperation de l'Id du topic cible et du contenu de la réponse depuis le corps de la requete
    const { AnswerId }  = req.body;

    // Recuperation de l'Id de l'utilisateur le header de la requete
    var headerAuth = req.headers['authorization'];
    UserId = jwt.decode(headerAuth.split(" ")[1]).id    // split : "Bearer TOKEN" => Decode => { id: }

    // Vérification de l'appartenance du message à l'utilisateur 
    Answer.findOne({ where: { UserId: UserId, id: AnswerId} }).then((response) => {
        if(response.length == 0){
            res.status(403)
            res.send({message: "La suppression a échoué : Supression par auteur different non autorisé."}) 
        } else {
            Answer.destroy({ where: { id: AnswerId} })
            .then((response) => {
                res.status(200);
                res.send({message: "Message supprimé."})
            })
        }
    })
}

exports.update = async (req, res) => {
    console.log("-----answer.update-----");

    // Recuperation de l'Id du topic cible et du contenu de la réponse depuis le corps de la requete
    const { AnswerId, content }  = req.body;

    // Recuperation de l'Id de l'utilisateur le header de la requete
    var headerAuth = req.headers['authorization'];
    UserId = jwt.decode(headerAuth.split(" ")[1]).id    // split : "Bearer TOKEN" => Decode => { id: }

    // Vérification de l'appartenance du message à l'utilisateur 
    Answer.findOne({ where: { UserId: UserId, id: AnswerId} }).then((response) => {
        if(response.length == 0){
            res.status(403)
            res.send({message: "La modification à échoué : Supression par auteur different non autorisé."}) 
        } else {
            Answer.update({content: content}, { where: { id: AnswerId} })
            .then((response) => {
                res.status(200);
                res.send({message: "Message modifié."})
            })
        }
    })
}

exports.findAllByTopic = async (req, res) => {
    console.log("-----findAllByTopic-----")
    const topicId = req.params.topicId;
    Answer.findAll({ 
        where: { topicId: topicId},
        attributes: ["id", "content", "createdAt"],
        include:  {model: User, attributes: ["username"]}, 
        order: [['createdAt', 'DESC']]
        // include: { model: Topic, attributes: ["id"]},
    })
    .then((Answers) => {
        // resps = []
        // Answers.forEach(answer => {
        //     resp = {
        //         id : answer.id,
        //         content : answer.content,
        //         createdAt : answer.createdAt,
        //         username : answer.User.username,
        //         topicId : topicId
        //     }

        //     resps.push(resp)
           
        //     // answer.Id = topicId
        // });
        // console.log(Answers)
        res.status(200).send(Answers)
    })
    .catch((err) => {
        if (err) {
          console.log(err);
        }
    });
}