import { Request } from 'express'
import * as jwt from 'express-jwt'
import * as jwtPermissions from 'express-jwt-permissions'

export const APP_SECRET = 's5TCf0KybHWHetMIeFda'

export function getUserId(req: Request): string | undefined {
  const user = req.user as { userId: string }
  return user.userId
}

export const jwtGuard = jwt({
  secret: APP_SECRET,
  algorithms: ['HS256'],
})

export const permissionsGuard = jwtPermissions()
