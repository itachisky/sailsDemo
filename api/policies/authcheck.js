const jwt = require('jsonwebtoken')

module.exports = function (req, res, next) {
    //const authHeader = req.headers.authorization;
    const token = req.cookies.token;
    if (token) {
        
        const jwtSecret = "doggo";
        jwt.verify(token, jwtSecret, (err, user) => {
            if (err) {
                return res.sendStatus(403);
            }

            req.user = user;
            next();
        });
    } else {
        res.sendStatus(401);
    }
}