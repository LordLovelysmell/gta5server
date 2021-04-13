import Strategy from '@server/events/custom/strategy/Strategy'

export default class ATMStrategy implements Strategy {
  NPC: any

  constructor(NPC: any) {
    this.NPC = NPC
  }

  public async execute(player: PlayerMp) {
    try {
    } catch (err) {
      console.error(err)
    }
  }
}
