import { Request, Response, NextFunction } from 'express'
import { Repository } from 'typeorm'
import { AppDataSource } from '../data-source'
import { User } from '../entities'
import { AppError } from '../errors'

const ensurePatchIsAdminOnlyMiddleare = async (req: Request, res: Response, next: NextFunction) => {

    const isAdminUserLogged = req.user.admin
    const idUserToBeUpdated : number = Number(req.params.id)
    const idUserFromRequest : number = Number(req.user.id)

    if ((idUserToBeUpdated === idUserFromRequest) === false && isAdminUserLogged === false){
        throw new AppError('Insufficient permission', 403)
    } else {
        return next()
    }  

}

export default ensurePatchIsAdminOnlyMiddleare
