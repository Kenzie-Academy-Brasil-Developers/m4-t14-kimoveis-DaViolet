import { Router } from 'express'
import ensureDataIsValidMiddleware from '../middlewares/ensureDataIsValid.middleware'
import ensureTokenIsValidMiddleware from '../middlewares/ensureTokenIsValidMiddleware.middleware'
import ensureCategoryIsUniqueMiddleware from '../middlewares/ensureCategoryIsUnique.middleware'
import ensureIsAdminMiddleare from '../middlewares/ensureIsAdmin.middleware'
import ensureCategoryExistsMiddleware from '../middlewares/ensureCategoryExists.middleware'
import { createCategorySchema } from '../schemas/category.schema'
import { createCategoryController } from '../controllers/category.controllers'
import { listCategoriesController } from '../controllers/category.controllers'
import { listRealEstatesInCategoryController } from '../controllers/category.controllers'

const categoryRoutes: Router = Router()

categoryRoutes.post('', ensureDataIsValidMiddleware(createCategorySchema), ensureTokenIsValidMiddleware, ensureCategoryIsUniqueMiddleware, ensureIsAdminMiddleare, createCategoryController)

categoryRoutes.get('', listCategoriesController)

categoryRoutes.get('/:id/realEstate', ensureCategoryExistsMiddleware, listRealEstatesInCategoryController)

export default categoryRoutes