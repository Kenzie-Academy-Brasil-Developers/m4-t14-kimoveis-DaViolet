///schedules/realEstate/:id
import { Router } from 'express'
import ensureDataIsValidMiddleware from '../middlewares/ensureDataIsValid.middleware'
import { createScheduleSchema } from '../schemas/schedule.schema'
import { createScheduleController } from '../controllers/schedule.controller'
import ensureTokenIsValidMiddleware from '../middlewares/ensureTokenIsValidMiddleware.middleware'
import ensureIsAdminMiddleare from '../middlewares/ensureIsAdmin.middleware'
import { requestScheduleSchema } from '../schemas/schedule.schema'
import { listSchedulesInRealEstateController } from '../controllers/schedule.controller'

const scheduleRoutes: Router = Router()

scheduleRoutes.post('', ensureTokenIsValidMiddleware, ensureDataIsValidMiddleware(requestScheduleSchema),createScheduleController)

scheduleRoutes.get('/realEstate/:id', ensureTokenIsValidMiddleware, ensureIsAdminMiddleare, listSchedulesInRealEstateController)

export default scheduleRoutes