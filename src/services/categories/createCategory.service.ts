import { ICategory, ICategoryReturn } from '../../interfaces/category.interfaces'
import { AppDataSource } from '../../data-source'
import { Category } from '../../entities'
import { Repository } from 'typeorm'
import { returnCategorySchema } from '../../schemas/category.schema'

const createCategoryService = async (categoryData: ICategory): Promise<ICategoryReturn> => {

    const categoryRepository: Repository<Category> = AppDataSource.getRepository(Category)

    const category: Category = categoryRepository.create(categoryData)

    await categoryRepository.save(category)
    
    const newCategory = returnCategorySchema.parse(category)
    
    return newCategory

}

export { createCategoryService }