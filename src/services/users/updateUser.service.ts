import { Repository } from "typeorm"
import { AppDataSource } from "../../data-source"
import { AppError } from "../../errors"
import { User } from "../../entities"
import { IUserReturn} from "../../interfaces/users.interfaces"
import { returnUserSchemaWithoutPassword } from "../../schemas/users.schema"
const updateUserService = async (newUserData: any, idUser: number, loggedUserAdmin: boolean, loggedUserId: number): Promise<IUserReturn> => {

    const userRepository: Repository<User> = AppDataSource.getRepository(User)

    const isAdminUserLogged : boolean = loggedUserAdmin
    const idUserToBeUpdated : number = Number(idUser)
    const idUserFromRequest : number = Number(loggedUserId)
    let newUser = newUserData

    const userToBeUpdated: any = await userRepository.findOne({
        where:{
            id: idUserToBeUpdated
        }
    })

    if ((idUserToBeUpdated === idUserFromRequest) === false && isAdminUserLogged === false){
        if (userToBeUpdated.admin === true){
            throw new AppError("Insufficient permission", 403)
        } 
    }

    if ((idUserToBeUpdated === idUserFromRequest) === false && isAdminUserLogged === false){
        if (userToBeUpdated.admin === true) {
            newUser.admin = false
        }
    }

    if (!(idUserToBeUpdated === idUserFromRequest) === false && userToBeUpdated.admin === false){
        if (newUser.admin === true) {
            newUser.admin = false
        }
    }

    const oldUserData = await userRepository.findOneBy({
        id: idUser
    })

    const user = userRepository.create({
        ...oldUserData,
        ...newUser
    })

    await userRepository.save(user)

    const updatedUser = returnUserSchemaWithoutPassword.parse(user)

    return updatedUser

}

export default updateUserService