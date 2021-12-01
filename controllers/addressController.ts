import { Request, Response } from 'express'
import Address  from '../models/Address'
import AuthInterface from './../interfaces/auth'

class AddressController {
    public async index (req: AuthInterface, res: Response): Promise<Response> {
        const addressID = req.params.id ;
        try{
            const address = await Address.findOne({ where: { id:addressID }})
            
            return res.status(200).json(address);

        }catch(error){

        }
        
        return res.json({addressID:addressID})
    }
    public async getByUser (req: AuthInterface, res: Response): Promise<Response> {
        const userID = req.params.id ;
        const parameter = req.query.country;
        const query = { where: { user_id:userID }}
        if(parameter){
            Object.assign(query.where,{country:parameter})
        }
        try{
            const address = await Address.findAll(query)

            return res.status(200).json(address);

        }catch(error){
            return res.status(500).json({response: 'failed :('});
        }
        
    }

    public async store (req: AuthInterface, res: Response): Promise<Response> {
        const userID = req.user?.id;
        const { address, number, cep, complement } = req.body;
        try{
            const result = await Address.create({ user_id: userID , address: address, number: number, cep: cep, complement: complement})

            return res.status(200).json({response: 'success :)'});
        }
        catch(error){
            return res.status(500).json({response: 'failed :('});
        }

    }
    public async update (req: AuthInterface, res: Response): Promise<Response> {
        const userID = req.user?.id;
        const addressID = req.params.id ;
        
        const { address, number, cep, complement } = req.body;
        try{
            const result = await Address.update({ address:address, number: number, cep: cep, complement: complement}, { where: { id: addressID ,user_id: userID} })

            return res.status(200).json({response: 'success :)'});
        }
        catch(error){
            return res.status(500).json({response: 'failed :('});
        }
       
    }
    public async delete (req: AuthInterface, res: Response): Promise<Response> {
        const userID = req.user?.id;
        const addressID = req.params.id ;
        try{
            const address = await Address.destroy({where:{ id: addressID, user_id : userID}})

            return res.status(200).json({response: 'success :)'});

        }catch(error){
            return res.status(500).json({response: 'failed :('});
        }
    }
}

export default new AddressController()