import { Request, Response } from 'express'
import { IUser, IUserUpdate } from '../interfaces/users.interfaces'
import { IRealEstate } from '../interfaces/realEstate.interfaces'
import createRealEstateService from '../services/realEstate/createRealEstate.service'
import { listRealEstatesService } from '../services/realEstate/listRealEstates.service'

const createRealEstateController = async (req: Request, res: Response) => {

    const realEstate: IRealEstate = req.body

    const newRealEstate = await createRealEstateService(realEstate)

    return res.status(201).json(newRealEstate)

}

const listRealEstatesController = async (req: Request, res: Response) => {
    
    const realEstates = await listRealEstatesService()

    return res.json(realEstates)

}

export {
    createRealEstateController,
    listRealEstatesController
}