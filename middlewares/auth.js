const jwt = require('jsonwebtoken');
const config = require('config');

const router = function (req, res, next) {
    if(!config.get("requireAuth"))
    return next();
        const token = req.headers['auth-token'];
        if (!token)
        return res.status(401).send("Access denied");
        try {
        const decoded = jwt.verify(token, req.app.get("jwtPrivateKey"));
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(400).send("Invalid Token");
    }
};

module.exports = router;
