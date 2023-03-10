import { DeepPartial } from 'typeorm';
import { createUserSchema,
    updateUserSchema,
    returnUserSchemaWithoutPassword,
    allUsersSchema, updateUserNonAdminSchema } from '../schemas/users.schema'
import { z } from 'zod'

type IUser = z.infer<typeof createUserSchema>
type IUserReturn = z.infer<typeof returnUserSchemaWithoutPassword>
type IUsersReturn = z.infer<typeof allUsersSchema>
type IUserUpdate = DeepPartial<typeof updateUserSchema>
type IUserUpdateNonAdmin = DeepPartial<typeof updateUserNonAdminSchema>
export {
    IUser,
    IUserReturn,
    IUsersReturn,
    IUserUpdate,
    IUserUpdateNonAdmin
}