import { IUser, IUserReturn } from '../../interfaces/users.interfaces'
import { AppDataSource } from '../../data-source'
import { User } from '../../entities'
import { Repository } from 'typeorm'
import { returnUserSchemaWithoutPassword } from '../../schemas/users.schema'

const createUserService = async (userData: IUser): Promise<IUserReturn> => {

    const userRepository: Repository<User> = AppDataSource.getRepository(User)

    const user: User = userRepository.create(userData)

    await userRepository.save(user)
    
    const newUser = returnUserSchemaWithoutPassword.parse(user)
    
    return newUser

}

export default createUserService