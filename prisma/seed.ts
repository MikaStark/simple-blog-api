import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  const permissions = await prisma.permission.createMany({
    data: [
      { code: 'admin' },
      { code: 'post:read' },
      { code: 'post:write' },
      { code: 'post:delete' },
    ],
  })
  console.log(permissions)
  const admin = await prisma.user.create({
    data: {
      login: 'admin',
      name: 'Admin',
      password: '$2a$10$VCu7bY.4yVxfDen48F3iK.U2iTmSRVE6lOZJpQOeYyLv3rzSwDqdG', //test1234
      permissions: {
        connect: { code: 'admin' },
      },
    },
  })
  console.log(admin)
  const modo = await prisma.user.create({
    data: {
      login: 'mod',
      name: 'Moddo',
      password: '$2a$10$VCu7bY.4yVxfDen48F3iK.U2iTmSRVE6lOZJpQOeYyLv3rzSwDqdG', //test1234
      permissions: {
        connect: [
          { code: 'post:read' },
          { code: 'post:write' },
          { code: 'post:delete' },
        ],
      },
    },
  })
  console.log(modo)
  const user = await prisma.user.create({
    data: {
      login: 'user',
      name: 'User',
      password: '$2a$10$VCu7bY.4yVxfDen48F3iK.U2iTmSRVE6lOZJpQOeYyLv3rzSwDqdG', //test1234
      permissions: {
        connect: [{ code: 'post:read' }],
      },
    },
  })
  console.log(user)
  const foo = await prisma.user.create({
    data: {
      login: 'foo',
      name: 'Foo',
      password: '$2a$10$VCu7bY.4yVxfDen48F3iK.U2iTmSRVE6lOZJpQOeYyLv3rzSwDqdG', //test1234
    },
  })
  console.log(foo)
  const post = await prisma.post.create({
    data: {
      title: 'Hello world!',
      content: 'This is the first post',
      author: {
        connect: { id: admin.id },
      },
    },
  })
  console.log(post)
}

main()
  .catch((e) => {
    throw e
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
