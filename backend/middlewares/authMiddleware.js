import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || "your-super-secret-key-for-now";

export const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (authHeader && authHeader.startsWith('Bearer ')) {
        const token = authHeader.split(' ')[1];
        jwt.verify(token, JWT_SECRET, (err, user) => {
            if (err) {
                return res.status(403).json({ message: "Forbidden: Invalid token" });
            }
            req.user = user; // Attach user payload to the request object
            next();
        });
    } else {
        res.status(401).json({ message: "Unauthorized: No token provided" });
    }
};

export const adminMiddleware = (req, res, next) => {
    if (req.user && (req.user.role === 'admin' || req.user.role === 'manager')) {
        next();
    } else {
        res.status(403).json({ message: "Forbidden: Admin access required" });
    }
};