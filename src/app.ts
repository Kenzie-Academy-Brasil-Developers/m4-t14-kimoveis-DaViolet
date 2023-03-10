import 'express-async-errors'
import express, { Application } from 'express'
import { handleErrors } from './errors'
import loginRoutes from './routers/login.routes'
import userRoutes from './routers/user.routes'
import categoryRoutes from './routers/category.routes'
import realEstate from './routers/realEstate.routes'
import scheduleRoutes from './routers/schedule.routes'

const app: Application = express()
app.use(express.json())

app.use('/login', loginRoutes)
app.use('/users', userRoutes)
app.use('/realEstate', realEstate)
app.use('/categories', categoryRoutes)
app.use('/schedules', scheduleRoutes)

app.use(handleErrors)
export default app