const jwt = require('jsonwebtoken');
const config = require('./config');

const authMiddleware = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) return res.redirect('/'); // Redirect to login if no token
    try {
        const decoded = jwt.verify(token, config.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        res.redirect('/'); // Redirect to login if token is invalid
    }
};

module.exports = authMiddleware;
