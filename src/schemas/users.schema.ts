import { hashSync } from 'bcryptjs'
import { z } from 'zod'

const createUserSchema = z.object({
    name: z.string().max(45),
	email: z.string().email().max(45),
	password: z.string().max(120),
    admin: z.boolean().optional().default(false)
})

const returnUserSchema = createUserSchema.extend({
    id: z.number(),
    createdAt: z.string(),
    updatedAt: z.string(),
    deletedAt: z.string().nullable()
})

const updateUserSchema = returnUserSchema.omit({id: true, createdAt: true, updatedAt: true, deletedAt: true}).partial({name: true, password: true, email: true, admin: true})

const updateUserNonAdminSchema = returnUserSchema.omit({id: true, createdAt: true, updatedAt: true, deletedAt: true, admin: true}).partial({name: true, password: true, email: true})

const returnUserSchemaWithoutPassword = returnUserSchema.omit({password: true})

const allUsersSchema = z.array(returnUserSchemaWithoutPassword)

export {
    createUserSchema,
    returnUserSchema,
    returnUserSchemaWithoutPassword,
    allUsersSchema,
    updateUserSchema,
    updateUserNonAdminSchema
}