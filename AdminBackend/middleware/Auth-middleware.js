const JWT = require("jsonwebtoken");
const User = require("../../Backend/models/user-model");

module.exports.authMiddleware = async(req,res,next)=>{
    const token = req.header('Authorization');
    try {
        console.log(token)
        if(!token){
            return res.status(400).json({message:"unauthorized user"});
        }

        const verifyToken =  JWT.verify(token,process.env.JWT_SECREAT_KEY);

        const findUser = await User.findOne({where:{token}});

        if(!findUser){
            return res.status(400).json({message:"unauthorized user"});
        }

        if(findUser.email!==process.env.ADMIN_EMAIL){
            return res.status(400).json({message:"unauthorized user"});
        }

        req.user = findUser;
        next();


    } catch (error) {
        console.log(error)
    }
}