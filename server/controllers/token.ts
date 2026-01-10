import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config();

let  secret=process.env.JWT_SECRET!;
export function generateToken(uid:string){


 return jwt.sign({uid},secret,{
    expiresIn:'30d'
})

}

export function verifyToken( token:string){

 return jwt.verify(token,secret)

}