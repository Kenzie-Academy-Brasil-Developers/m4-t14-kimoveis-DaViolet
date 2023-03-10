import { z } from 'zod'
import { addressSchema, returnAddressSchema } from './address.schema'
import { returnCategorySchema } from './category.schema'

const createRealEstateSchema = z.object({
    value: z.number().positive().or(z.string()),
    size: z.number().int().positive(),
    categoryId: z.number(),
    address: addressSchema
})

const returnRealEstateSchema = z.object({
    id: z.number(),
    value: z.number().positive().or(z.string()),
    size: z.number().int().positive(),
    sold: z.boolean(),
    address: returnAddressSchema,
    category: returnCategorySchema,
    createdAt: z.string(),
    updatedAt: z.string()
})

const returnRealEstateWithoutRelationsSchema = returnRealEstateSchema.extend({}).omit({category:true})

const allRealEstatesSchema = z.array(returnRealEstateSchema)

export {
    createRealEstateSchema,
    returnRealEstateSchema,
    allRealEstatesSchema,
    returnRealEstateWithoutRelationsSchema
}