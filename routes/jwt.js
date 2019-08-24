const jwt = require('jsonwebtoken');
let authToken = (req, res, next) => {
    let token = req.body.authtoken || req.query.authtoken || req.headers.authtoken;
    if(req.query.visitor == 'true'){
        next();
    }
    else if (token) {
        jwt.verify(token, process.env.configSecret, function (err, decoded) {
            if (err) {
                return res.json({
                    success: false,
                    message: 'Failed to authenticate token.',
                    data: null
                });
            } else {
                req.authenticationUser = decoded;
                next();
            }
        });
    } else {
        return res.status(403).send({
            success: false,
            message: 'No token provided.',
            data: null
        });
    }
}

module.exports = {
    authToken
}