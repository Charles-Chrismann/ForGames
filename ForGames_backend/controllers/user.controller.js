/** @format */

const { User } = require("../models");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

exports.updateUser = async (req, res) => {
    console.log("-----updateUser-----")
    var headerAuth = req.headers['authorization'];
    const UserId = jwt.decode(headerAuth.split(" ")[1]).id
    console.log("UserId : " + UserId)
    const { email, username, password, bio, profile_picture} = req.body;
    console.log(req.body)
    console.log(profile_picture)
    const userToUpdate = User.findOne({where: { id: UserId }})
    // let compare = await bcrypt.compare(password, userToUpdate.password);
    // if (compare == false) {
    //     return res.json({
    //       message: "Mot de passe erroné.",
    //     });
    // }
    console.log(bio)

    // userToUpdate = User.findOne({
    //     where:{id: UserId}
    // })
    // .then(
    //     (user) => {

    //         console.log(user)

    //         const userToUpdate = new User({
    //             UserId,
    //             username,
    //             email,
    //         });
    //         userToUpdate.save()
    //     }
    // )
    // let salt = await bcrypt.genSalt(10);
    // let hashedPassword = await bcrypt.hash(password, salt);
    await User.update({ username: username, email: email, bio: bio, profile_picture: profile_picture}, {//, password: hashedPassword
        where: {
            id: UserId
        }
    });
    res.status(200).send()
}

exports.getUser = async (req, res) => {
    console.log("-----user.getUser-----")
    var headerAuth = req.headers['authorization'];
    UserId = jwt.decode(headerAuth.split(" ")[1]).id
    User.findOne({where: {id: UserId}})
    .then(
        (resp) => {
            res.status(200).send(resp)
        }
    )
}