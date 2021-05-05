import { ErrorRequestHandler } from 'express'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  if (err.code) {
    if (err.code === 'credentials_required') {
      return res.status(err.status).send({
        code: err.code,
        message: err.inner.message,
      })
    }
    if (err.code === 'permission_denied') {
      return res.status(err.status).send({
        code: err.code,
        message: err.inner.message,
      })
    }
  }
  return res.status(500).json(err)
}
