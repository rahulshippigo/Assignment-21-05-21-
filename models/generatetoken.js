const jwt = require('jsonwebtoken');

const generatetoken = (user, sign) => {
    const token = jwt.sign(
        {
            _id: user._id, 
            isAdmin: user.isAdmin
        },
        sign
    );
    
    return token;
};

module.exports = generatetoken;