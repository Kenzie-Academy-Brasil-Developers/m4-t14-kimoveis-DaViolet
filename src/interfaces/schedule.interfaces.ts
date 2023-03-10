import { createScheduleSchema, requestScheduleSchema } from '../schemas/schedule.schema';
import { z } from 'zod'

type ISchedule = z.infer<typeof createScheduleSchema>
type IScheduleRequest = z.infer<typeof requestScheduleSchema>
export {
    ISchedule,
    IScheduleRequest
}