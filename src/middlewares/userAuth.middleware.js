import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../model/UserModal.js";
dotenv.config();
export const userAuth = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            throw new Error("Please Log In first.");
        }
        const token = authHeader.split(" ")[1];
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
        const user = await User.findById({ _id: decodedToken._id }).select('-password');
        if (!user) {
            throw new Error("No User Found!");
        }
        req.user = user;
        next();
    }
    catch (err) {
        res.status(400).json({
            message: err instanceof Error ? err.message : "Unauthorized User",
        });
    }
};
//# sourceMappingURL=userAuth.middleware.js.map