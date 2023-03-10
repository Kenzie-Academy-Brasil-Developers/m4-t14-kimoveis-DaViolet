import { z } from 'zod'
import { returnRealEstateSchema } from './realEstate.schema'

const requestScheduleSchema = z.object({
    date: z.string().regex(/^(19|20)\d{2}\/(0[1-9]|1\d|2\d|3[01])\/(0[1-9]|1[0-2])$/),
    hour: z.string().regex(/^([01]?\d|2[0-3]):([0-5]\d)/),
    realEstateId: z.number()
})

const createScheduleSchema = z.object({
    date: z.string().regex(/^(19|20)\d{2}\/(0[1-9]|1\d|2\d|3[01])\/(0[1-9]|1[0-2])$/),
    hour: z.string().regex(/^([01]?\d|2[0-3]):([0-5]\d)/),
    realEstateId: returnRealEstateSchema,
    user: z.number()
})

export {
    createScheduleSchema, requestScheduleSchema
}

