import { Request, Response, NextFunction } from 'express'
import { AppError } from '../errors'

const ensureIsAdminMiddleare = async (req: Request, res: Response, next: NextFunction) => {

    const isAdminUser = req.user.admin

    if(isAdminUser === false){
        throw new AppError('Insufficient permission', 403)
    } else {
        return next()
    }

}

export default ensureIsAdminMiddleare
