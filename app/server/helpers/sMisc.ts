class MiscSingleton {

  getRandomInt(min = 0, max = 100) {
    return Math.floor(Math.random() * (max - min + 1)) + min
  }

  getPlayerCoordJSON(player: PlayerMp) {
    const obj = {
      x: player.position.x,
      y: player.position.y,
      z: player.position.z,
      rot: player.heading,
      dim: player.dimension,
    }
    if (player.vehicle) obj.rot = player.vehicle.rotation.z
    return JSON.stringify(obj)
  }
}
export const miscSingleton = new MiscSingleton()
