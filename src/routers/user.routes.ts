import { Router } from 'express'
import { createUserController, listUsersController, deleteUserController, updateUserController } from '../controllers/users.controllers'
import ensureDataIsValidMiddleware from '../middlewares/ensureDataIsValid.middleware'
import ensureTokenIsValidMiddleware from '../middlewares/ensureTokenIsValidMiddleware.middleware'
import ensureIsAdminMiddleare from '../middlewares/ensureIsAdmin.middleware'
import ensureUserExistsMiddleware from '../middlewares/ensureUserExists.middleware'
import ensureUserIsUniqueMiddleware from '../middlewares/ensureUserIsUnique.middleware'
import ensureMasterUpdateIsAdminOnlyMiddleware from '../middlewares/ensureMasterUpdateIsAdminOnly.middleware'
import { createUserSchema } from '../schemas/users.schema'
import { updateUserSchema } from '../schemas/users.schema'

const userRoutes: Router = Router()

userRoutes.post('', ensureDataIsValidMiddleware(createUserSchema), ensureUserIsUniqueMiddleware, createUserController)
userRoutes.get('', ensureTokenIsValidMiddleware, ensureIsAdminMiddleare, listUsersController)
userRoutes.delete('/:id', ensureTokenIsValidMiddleware, ensureUserExistsMiddleware, ensureIsAdminMiddleare, deleteUserController)
userRoutes.patch('/:id', ensureDataIsValidMiddleware(updateUserSchema), ensureTokenIsValidMiddleware, ensureUserExistsMiddleware, updateUserController)

export default userRoutes