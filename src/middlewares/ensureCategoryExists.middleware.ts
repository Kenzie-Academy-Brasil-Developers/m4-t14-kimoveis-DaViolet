import { Request, Response, NextFunction} from 'express'
import { Repository } from 'typeorm'
import { AppDataSource } from '../data-source'
import { Category } from '../entities'
import { AppError } from '../errors'

const ensureCategoryExistsMiddleware = async (req: Request, res: Response, next: NextFunction): Promise<void> => {

    const categoryRepository: Repository<Category> = AppDataSource.getRepository(Category)

    const findCategory = await categoryRepository.findOne({
        where: {
            id: Number(req.params.id)
        }
    })

    if(!findCategory){
        throw new AppError('Category not found', 404)
    }

    return next()

}

export default ensureCategoryExistsMiddleware