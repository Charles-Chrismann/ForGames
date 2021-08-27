/** @format */
const { User } = require("../models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { Op } = require("sequelize");
require("dotenv").config();

usernameMaxLength = 24;
passwordMinLength = 8;

function verif(toVerif, type){
  switch(type){
    case "username":
      return 0 < toVerif.length && toVerif.length < usernameMaxLength
    case "email":
      break;
    case "password":
      return passwordMinLength <= toVerif.length 
  }
}

exports.register = async (req, res) => {
  console.log("-----register-----")
  
  // Récupération des informations necessaire à l'inscription depuis le corps de la requete
  const { username, email, password } = req.body;

  // vérification de la bonne forme des informations
  if( !verif(username, "username") || !verif(password, "password")){ 
    return res.status(403).json({
    message: "username format or password format invalid !",
  });}
  
  // Si la forme des information est valide, creation du model de l'utilisateur
  let salt = await bcrypt.genSalt(10);
  let hashedPassword = await bcrypt.hash(password, salt);
  const newUser = await new User({
      username,
      email,
      password: hashedPassword,
  });

  // Vérification de l'absence d'un utilisateur similaire
  const alreadyExistsUser = await User.findOne({
      where: { [Op.or]:[{email: newUser.email}, { username: newUser.username }] },
    }).catch((err) => {
      console.log("Error : ", err);
    });
    if (alreadyExistsUser) {
      return res.json({
        message: "Email or username already used !",
      });
  }
  
  // Si l'utilisateur n'existe pas deja, on le cree
  newUser.save()
  // Puis on le connect directement grace au jwt
  .then((response) => {
    User.findOne({ where: { email: newUser.email } })
    .then((response) => {
    const accessToken = jwt.sign(
      // Ecriture du Payload
     {
       id: response.id,
       mail: response.email,
     },
     process.env.ACCESS_TOKEN_SECRET
    );

    res.writeHead(201, {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${accessToken}`,
      "Access-Control-Allow-Credentials": "true",
      "Methods": "GET, PUT, POST, DELETE"
    });
  
    res.write(
      JSON.stringify({
        email: newUser.mail,
        username: newUser.username,
        message: "Welcome",
        token: accessToken
      })
    );
  
    res.send();
    })
  })
  .catch((err) => {
    console.log("Error : ", err);
    res.json({
      error: "Cannot register user at the moment!",
    });
  });
};

exports.login = async (req, res) => {
  console.log("-----login-----")

  // Récupération des informations necessaire à la connexion depuis le corps de la requete
  const { email, password } = req.body;

  // Hashage du mot de passe pour comparaison
  let salt = await bcrypt.genSalt(10);
  let hashedPassword = await bcrypt.hash(password, salt);

  // Preparation du model de l'utilisateur
  const user = {
    email,
    password: hashedPassword,
  };

  // Vérification de l'existence d'un utilisateur via l'email recu
  const userWithEmail = await User.findOne({ where: { email: user.email } }).catch((err) => {
    console.log("Error: ", err);
  });
  if(!userWithEmail){
    res.json({
      message: "Utilisateur inconnu"
    })
  }

  // Si l'utilisateur existe, on comparre le mot de passe connu et celui recu, tout deux hashé
  let compare = await bcrypt.compare(password, userWithEmail.password);
  if (compare == false) {
    return res.json({
      message: "Mot de passe erroné.",
    });

  // Si les mot de passe correspondent, on prepare et renvoie un token d'acces
  }  else if(compare == true) {
    const accessToken = jwt.sign(
      // Ecriture du Payload
     {
       id: userWithEmail.id,
       mail: userWithEmail.mail,
     },
     process.env.ACCESS_TOKEN_SECRET
    );
  
    res.writeHead(201, {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${accessToken}`,
      "Access-Control-Allow-Credentials": "true",
      "Methods": "GET, PUT, POST, DELETE"
    });
  
  
    res.write(
      JSON.stringify({
        mail: userWithEmail.mail,
        id: userWithEmail.id,
        username: userWithEmail.username,
        password: userWithEmail.password,
        message: "Welcome Back!",
        token: accessToken
      })
    );
  
    res.send();
  }

  
};