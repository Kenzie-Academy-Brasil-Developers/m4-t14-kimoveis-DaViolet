import { Router } from 'express'
import ensureDataIsValidMiddleware from '../middlewares/ensureDataIsValid.middleware'
import ensureIsAdminMiddleare from '../middlewares/ensureIsAdmin.middleware'
import ensureTokenIsValidMiddleware from '../middlewares/ensureTokenIsValidMiddleware.middleware'
import ensureAddressIsUniqueMiddleware from '../middlewares/ensureAddressIsUnique.middleware'
import { createRealEstateController, listRealEstatesController } from '../controllers/realEstate.controllers'
import { createRealEstateSchema } from '../schemas/realEstate.schema'
import { addressSchema } from '../schemas/address.schema'

const realEstate: Router = Router()
realEstate.post('',
ensureTokenIsValidMiddleware,
ensureIsAdminMiddleare,
ensureDataIsValidMiddleware(createRealEstateSchema),
ensureAddressIsUniqueMiddleware,
createRealEstateController)
realEstate.get('', listRealEstatesController)

export default realEstate