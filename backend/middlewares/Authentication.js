const jwt = require('jsonwebtoken')

function authenticateToken(req, res, next) {
    const token = req.headers.authorization && req.headers.authorization.split(' ')[1];
    if (!token) {
        return res.status(401).json({ error: 'Access denied, token missing' });
    }

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified; // Attach user info to request
        next();
    } catch (error) {
        res.status(403).json({ error: 'Invalid token' });
    }
}

module.exports = authenticateToken