import { Repository } from "typeorm"
import { AppDataSource } from "../../data-source"
import { Category } from "../../entities"
import { ICategoriesReturn } from "../../interfaces/category.interfaces"
import { allCategoriesSchema } from "../../schemas/category.schema"

const listCategoriesService = async (): Promise<ICategoriesReturn> => {

    const categoryRepository: Repository<Category> = AppDataSource.getRepository(Category)

    const findCategories: Array<Category> = await categoryRepository.find()

    const categories = allCategoriesSchema.parse(findCategories)

    return categories

}

export {
    listCategoriesService
}