const express = require('express')
const { Player, Character } = require('@server/models')

export default class App {
  app: typeof express

  constructor() {
    this.app = express()
    this.app.use(express.json())

    this.app.get('/players', async (req: any, res: any) => {
      try {
        const player = await Player.findAll()

        return res.json(player)
      } catch (err) {
        console.error(err)
        return res.status(500).json(err)
      }
    })

    this.app.get('/characters', async (req: any, res: any) => {
      try {
        const character = await Character.findAll()

        return res.json(character)
      } catch (err) {
        console.error(err)
        return res.status(500).json(err)
      }
    })
  }

  listen(cb: any) {
    this.app.listen({ port: 5000 }, async () => {
      await cb()
    })
  }
}
