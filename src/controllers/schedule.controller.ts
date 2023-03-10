import { Request, Response } from 'express'
import { IUser, IUserUpdate } from '../interfaces/users.interfaces'
import { ISchedule, IScheduleRequest } from '../interfaces/schedule.interfaces'
import createScheduleService from '../services/schedules/createSchedule.service'
import { listSchedulesInRealEstate } from '../services/schedules/listSchedulesInRealEstate.service'

const createScheduleController = async (req: Request, res: Response) => {
    
    const scheduleData: IScheduleRequest = req.body
    
    const user = Number(req.user.id)
    const newSchedule = await createScheduleService(user, scheduleData)

    return res.status(201).json(newSchedule)

}

const listSchedulesInRealEstateController = async (req: Request, res: Response) => {
    
    const realEstateId = Number(req.params.id)
    const newSchedule = await listSchedulesInRealEstate(realEstateId)

    return res.status(200).json(newSchedule)

}

export {
    createScheduleController,
    listSchedulesInRealEstateController
}