import { Request ,Response, NextFunction } from 'express'
import AuthInterface from './../interfaces/auth'
import jwtService from 'jsonwebtoken'


class Auth{
    verifyToken(req: AuthInterface, res: Response, next: NextFunction){
        const jwt = <string>req.headers['authorization'];
        let user;
       try{
            user = <any>jwtService.verify(jwt, <string>process.env.SECRET_API);
            
            req.user = user;
        }catch(error){
            res.status(401).end();
            return;
        }
        next();
        
    }
}
export default Auth