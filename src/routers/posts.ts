import { Router } from 'express'
import { prisma } from '../prisma'
import { getUserId, jwtGuard, permissionsGuard } from '../utils'

const router = Router()

router.get(
  '/',
  jwtGuard,
  permissionsGuard.check([['admin'], ['post:read']]),
  async (req, res) => {
    const { search, skip, take, orderBy, direction } = req.query
    const posts = await prisma.post.findMany({
      where: search
        ? {
            OR: [
              { title: { contains: search as string } },
              { content: { contains: search as string } },
            ],
          }
        : undefined,
      include: { author: true },
      take: Number(take) || undefined,
      skip: Number(skip) || undefined,
      orderBy: orderBy
        ? {
            [orderBy as string]: direction || 'desc',
          }
        : undefined,
    })
    res.json(posts)
  }
)

router.get(
  '/:id',
  jwtGuard,
  permissionsGuard.check([['admin'], ['post:read']]),
  async (req, res) => {
    const id = req.params.id
    const post = await prisma.post.findUnique({
      where: { id },
      include: { author: true },
    })

    if (post) {
      return res.json(post)
    }
    return res.sendStatus(404)
  }
)

router.post(
  '/',
  jwtGuard,
  permissionsGuard.check([['admin'], ['post:write']]),
  async (req, res) => {
    const userId = getUserId(req)
    const { title, content } = req.body
    const post = await prisma.post.create({
      data: {
        content,
        title,
        author: {
          connect: { id: userId },
        },
      },
    })
    return res.json(post)
  }
)

router.patch(
  '/:id',
  jwtGuard,
  permissionsGuard.check([['admin'], ['post:write']]),
  async (req, res) => {
    const id = req.params.id
    const { title, content } = req.body
    const post = await prisma.post.update({
      data: { title, content },
      where: { id },
    })

    if (post) {
      return res.json(post)
    }
    return res.sendStatus(404)
  }
)

router.delete(
  '/:id',
  jwtGuard,
  permissionsGuard.check([['admin'], ['post:delete']]),
  async (req, res) => {
    const id = req.params.id
    const post = await prisma.post.delete({ where: { id } })

    if (post) {
      return res.json(post)
    }
    return res.sendStatus(404)
  }
)

export default router
