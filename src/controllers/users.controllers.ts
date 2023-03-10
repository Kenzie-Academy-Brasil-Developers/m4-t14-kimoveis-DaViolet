import { Request, Response } from 'express'
import { IUser, IUserUpdate } from '../interfaces/users.interfaces'
import createUserService from '../services/users/createUsers.service'
import deleteUserService from '../services/users/deleteUser.service'
import { listUsersService } from '../services/users/listUsers.service'
import updateUserService from '../services/users/updateUser.service'

const createUserController = async (req: Request, res: Response) => {

    const userData: IUser = req.body

    const newUser = await createUserService(userData)

    return res.status(201).json(newUser)

}

const listUsersController = async (req: Request, res: Response) => {
    
    const users = await listUsersService()

    return res.json(users)

}

const deleteUserController = async (req: Request, res: Response) => {

    await deleteUserService(Number(req.params.id))

    return res.status(204).send()
}

const updateUserController = async (req: Request, res: Response) => {

    const userData: IUserUpdate = req.body
    const idUser = Number(req.params.id)
    const loggedUserAdmin = req.user.admin
    const loggedUserId = req.user.id

    const updatedUser = await updateUserService(userData, idUser, loggedUserAdmin, loggedUserId)

    return res.json(updatedUser)
}

export {
    createUserController,
    listUsersController,
    deleteUserController,
    updateUserController
}