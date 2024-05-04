const jwt = require('jsonwebtoken');
require('dotenv').config();
const verifyToken = (req, res, next) => {
    const authHeader = req.headers['Authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized: No token provided' });
    }
    jwt.verify(token, process.env.SECRET_KEY, (err, userData) => {
        if (err) {
            return res.status(403).json({ message: 'Unauthorized: Invalid token' });
        }
        req.userData = userData;
        return res.status(200).json({message : 'Token Verify'})
    });
};

module.exports = { verifyToken };



