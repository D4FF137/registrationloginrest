import jwt from 'jsonwebtoken'

export class AuthMidleware{
    static async isAuth(req,res, next){
        try{
            const auth = req.headers.authorization;
            if(!auth){
                return res.status(401).json({msg:"Не авторизован"});
            }
            const token = auth.split(' ')[1];
            const is_verifyed = await jwt.verify(token, `${process.env.SECRET}`);
            if(!is_verifyed){
                return res.status(403).json({msg:"доступ запрещен"})
            }
            next();
        } catch(error){
            return res.status(403).json({msg:"доступ запрещен"})
        }
}
}