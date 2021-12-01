import { Request, Response } from 'express'
import  User from '../models/User'
import AuthInterface from './../interfaces/auth'
import jwt from 'jsonwebtoken';
class UserController {
    
    public async index (req: AuthInterface, res: Response): Promise<Response> {
        const users = await User.findOne({include:User.associations.address, where:{id : req.user?.id}});
        return res.json(users);
    }
    public async auth (req: Request, res: Response): Promise<Response> {
        const { email, password } = req.body;
        let token = "";
        try{
            const auth = <any>await User.findOne({ where:{ email:email, password:password } })
            if(auth){
                const user = {
                    nome: auth.name,
                    email: auth.email,
                    id: auth.id
                }
                
                token =  jwt.sign(user, <string>process.env.SECRET_API, {expiresIn:300});
                
                return res.json({ auth: user, token: token });
            }else {
                res.status(401);
                return res.json({error:'User not found :('})
            }
            
        }catch(error){
           return res.json({error:error});
        }
     
    }
     public async logout (req: AuthInterface, res: Response): Promise<Response> {
     
        return res.status(200).json({ auth: false, token: null });
    }

    public async store (req: Request, res: Response): Promise<Response> {
        //const user = await User.create(req.body)
        
        const { name, email, password } = req.body;
        try{
            const user = await User.create({ name:name, email:email, password:password });
    
            return res.status(200).json({response: 'success :)'});
        }catch(error){ 
            return res.status(500).json({response: 'failed :('});
        }

    }
    public async update (req: AuthInterface, res: Response): Promise<Response> {
        const userID = req.params.id ;
        const { name, email, password } = req.body;
        if(parseInt(userID) != req.user?.id){
            return res.status(401).json({error:'not :('});
        }

        try{
            await User.update({ name: name,email:email, password:password }, { where: { id: userID } });

            return res.status(200).json({message: 'success :)'});
        }catch(error){
            return res.status(500).json({message: 'failed :('});
        }
    }
    public async delete (req: AuthInterface, res: Response): Promise<Response> {
        const userID = req.params.id ;
        if(parseInt(userID) != req.user?.id){
            return res.status(401).json({error:'not :('});
        }
        try{
            const user = await User.destroy({where:{ id : userID}});

            return res.status(200).json({message: 'success :)'});

        }catch(error){
            return   res.status(500).json({message:'error :('});
        }
    }
}

export default new UserController()