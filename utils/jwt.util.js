// Imports
var jwt = require('jsonwebtoken');

const JWT_SIGN_SECRET = 'dsjqfhizahuiahuijiodksqijiajeiojksqds484d5sqd5qd56';

// Exported functions
module.exports = {
    generateTokenForUser: function (userData) {
        return jwt.sign({
                userid: userData.id,
            },
            JWT_SIGN_SECRET,
            {
                expiresIn: '1h'
            })
    },

    parseAuthorization: function (authorization) {
        return (authorization != null) ? authorization.replace('Bearer ', '') : null;
    },

    verify: function (authorization) {
        var token = module.exports.parseAuthorization(authorization);
        try {
            var user = jwt.verify(token, JWT_SIGN_SECRET);
        } catch(err) { }
        return user;
    }
}