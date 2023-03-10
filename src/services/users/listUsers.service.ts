import { Repository } from "typeorm"
import { AppDataSource } from "../../data-source"
import { User } from "../../entities"
import { IUsersReturn } from "../../interfaces/users.interfaces"
import { allUsersSchema } from "../../schemas/users.schema"

const listUsersService = async (): Promise<IUsersReturn> => {

    const userRepository: Repository<User> = AppDataSource.getRepository(User)

    const findUsers: Array<User> = await userRepository.find({
        withDeleted: true
    })

    const users = allUsersSchema.parse(findUsers)

    return users

}

export {
    listUsersService
}