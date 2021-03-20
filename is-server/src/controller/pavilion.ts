import { RequestHandler } from "express";
import httpStatus from "http-status";
import { prisma } from "../app";

export const findMany: RequestHandler = async (req, res) => {
  try {
    const items = await prisma.pavilion.findMany()
    res.send(items)
  } catch (err) {
    res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR)
  }
}

export const findUnique: RequestHandler = async (req, res) => {
  const result = await prisma.pavilion.findUnique({
    where: {
      id: req.params['id']
    }
  })
  res.send(result)
}

export const create: RequestHandler = async (req, res) => {
  try {
    const result = await prisma.pavilion.create({
      data: req.body
    })
    res.send(result)
  } catch (err) {
    console.log(err)
    res.sendStatus(httpStatus.BAD_REQUEST)
  }
}