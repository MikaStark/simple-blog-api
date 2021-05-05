import { RequestHandler } from 'express'

export const notFound: RequestHandler = (req, res) => {
  res.sendStatus(404)
}
