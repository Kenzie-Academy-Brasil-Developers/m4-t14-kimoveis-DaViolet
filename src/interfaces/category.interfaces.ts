import { createCategorySchema } from '../schemas/category.schema'
import { allCategoriesSchema } from '../schemas/category.schema'
import { returnCategorySchema } from '../schemas/category.schema'
import { z } from 'zod'

type ICategory = z.infer<typeof createCategorySchema>
type ICategoryReturn = z.infer<typeof returnCategorySchema>
type ICategoriesReturn = z.infer<typeof allCategoriesSchema>

export {
    ICategory, ICategoryReturn, ICategoriesReturn
}