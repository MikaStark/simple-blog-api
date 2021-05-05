import { compare } from 'bcryptjs'
import * as express from 'express'
import { sign } from 'jsonwebtoken'
import { errorHandler } from './middlewares/error-handler'
import { notFound } from './middlewares/not-found'
import { prisma } from './prisma'
import posts from './routers/posts'
import { APP_SECRET } from './utils'

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())

app.get('/', (req, res) => {
  res.sendStatus(200)
})

app.post('/sign-in', async (req, res, next) => {
  const login = req.body.login
  const user = await prisma.user.findUnique({
    where: { login },
    include: { permissions: true },
  })
  if (!user) {
    return next({
      message: 'Wrong login or password',
    })
  }
  const passwordValid = await compare(req.body.password, user.password)
  if (!passwordValid) {
    next({
      message: 'Wrong login or password',
    })
  }
  res.send({
    token: sign(
      {
        userId: user.id,
        permissions: user.permissions.map(({ code }) => code),
      },
      APP_SECRET,
      {
        expiresIn: '1d',
      }
    ),
    user,
  })
})

app.use('/posts', posts)

app.all('*', notFound)

app.use(errorHandler)

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`)
})
