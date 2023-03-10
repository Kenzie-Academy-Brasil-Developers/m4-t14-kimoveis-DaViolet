import { AppDataSource } from '../../data-source'
import { Repository } from 'typeorm'
import { RealEstate, Schedule } from '../../entities'
import { AppError } from '../../errors'
import { User } from '../../entities'
import { IScheduleRequest } from '../../interfaces/schedule.interfaces'

const createScheduleService = async (userId: number, scheduleData: IScheduleRequest): Promise<any> => {

    const scheduleRepository: Repository<Schedule> = AppDataSource.getRepository(Schedule)

    const realEstateRepository: Repository<RealEstate> = AppDataSource.getRepository(RealEstate)

    const userRepository: Repository<User> = AppDataSource.getRepository(User)

    const newUser: User | null = await userRepository.findOne({
        where: {
            id: userId
        }
    })

    const hourSent = Number(scheduleData.hour[0]+scheduleData.hour[1])
    if(hourSent<=7 || hourSent >=19)
    {
        throw new AppError("Invalid hour, available times are 8AM to 18PM", 400)
    }

    function isWeekend(date = new Date()) {
        return date.getDay() === 6 || date.getDay() === 0;
    }

    const dateSent = new Date(scheduleData.date)

    if (isWeekend(dateSent)){
        throw new AppError("Invalid date, work days are monday to friday", 400)
    }

   const existingUserSchedule: Schedule | null = await scheduleRepository.findOne({
        where: {
            id: Number(userId)
        },
        relations: {
            user: true
        }
    })

    if (existingUserSchedule !== null){
        throw new AppError("User schedule to this real estate at this date and time already exists", 409)
    }
    
    const newRealEstate: any = await realEstateRepository.findOne({
        where: {
            id: Number(scheduleData.realEstateId)
        },
        relations: {
            address: true
        }
    })

    if (!newRealEstate){
        throw new AppError("RealEstate not found", 404)
    }

    const existsRealEstateSchedule = await scheduleRepository.createQueryBuilder('schedules_users_properties').
    innerJoinAndSelect('schedules_users_properties.user', 'user').where('user.id = :user', {user: userId}).
    andWhere('date = :date', {date: scheduleData.date}).andWhere('hour = :hour', {hour: scheduleData.hour}).getCount()

    if (existsRealEstateSchedule){
        throw new AppError("User schedule to this real estate at this date and time already exists", 409)
    }

    if (!newRealEstate){
        throw new AppError("RealEstate not found", 404)
    }

    const existsUserSchedule = await scheduleRepository.createQueryBuilder('schedules_users_properties').select('schedules_users_properties').
    where('date = :date', {date: scheduleData.date}).andWhere('hour = :hour', {hour: scheduleData.hour}).getCount()

   if (existsUserSchedule !== 0){
       throw new AppError("Schedule to this real estate at this date and time already exists", 409)
   }
    
    const realEstate = ({...newRealEstate})
    const user = ({...newUser})

    const schedule: Schedule = scheduleRepository.create({...scheduleData, realEstate, user})

    await scheduleRepository.save(schedule)

    const response = {message: 'Schedule created'}
    
    return response

}

export default createScheduleService