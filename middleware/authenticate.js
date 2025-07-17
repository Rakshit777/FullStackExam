import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const authenticateToken = async (req, res, next) => {
    const authHeader = req.headers['authorization'];

    const token = authHeader?.startsWith("Bearer ") ? authHeader.split(' ')[1] : null;

    if (!token) {
        return res.status(401).json({
            message: "Unauthorized Access"
        });
    }

    try {
        const decodeToken = jwt.verify(token, 'secret');
        
        if (!decodeToken) {
            return res.status(401).json({
            message: "Unauthorized Access"
        });
        }
        
        req.user = decodeToken;
 
        next();
    } catch (error) {
        console.log("ee",error);
        
        return res.status(400).json({
            message: "Invalid Token."
        })
    }

}

export default authenticateToken;