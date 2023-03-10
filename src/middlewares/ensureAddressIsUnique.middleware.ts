import { Request, Response, NextFunction} from 'express'
import { Repository } from 'typeorm'
import { AppDataSource } from '../data-source'
import { Address } from '../entities'
import { AppError } from '../errors'

const ensureAddressIsUniqueMiddleware = async (req: Request, res: Response, next: NextFunction): Promise<void> => {

    const addressRepository: Repository<Address> = AppDataSource.getRepository(Address)
    const findAddress = await addressRepository.findOneBy({
        
            street: req.body.address.street,
            number: req.body.address.number,
            zipCode: req.body.address.zipCode,
            state: req.body.address.state,
            city: req.body.address.city,
        
    })
    if(findAddress){
        throw new AppError('Address already exists', 409)
    }

    return next()

}

export default ensureAddressIsUniqueMiddleware