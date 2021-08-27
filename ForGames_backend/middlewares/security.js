const jwt        = require('jsonwebtoken');
require("dotenv").config();
const SECRET_KEY = process.env.ACCESS_TOKEN_SECRET;

exports.checkJWT = async (req, res, next) => {
    let token = req.headers['x-access-token'] || req.headers['authorization'];
    if (!!token && token.startsWith('Bearer ')) {
        token = token.slice(7, token.length);
    }

    if (token) {
        jwt.verify(token, SECRET_KEY, (err, decoded) => {
            if (err) {
                return res.status(401).json('token_not_valid');
            } else {
                req.decoded = decoded;

                const expiresIn = 24 * 60 * 60;
                const newToken  = jwt.sign({
                    user : decoded.user
                },
                SECRET_KEY,
                {
                    expiresIn: expiresIn
                });

                res.header('Authorization', 'Bearer ' + newToken);
                next();
            }
        });
    } else {
        return res.status(401).json('token_required');
    }
}