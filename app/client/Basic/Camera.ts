interface ICamera {
  name: string,
  position: Vector3Mp,
  rotation: Vector3Mp,
  fov: number
}

export class Camera {
  camera: CameraMp

  constructor({ name, position, rotation, fov }: ICamera) {
    this.camera = mp.cameras.new(name, position, rotation, fov)
    mp.game.cam.renderScriptCams(true, false, 0, false, false)
  }

  destroy() {
    this.setActive(false)
    mp.game.cam.renderScriptCams(false, false, 0, false, false)
    this.camera.destroy()
  }

  setActive(isActive: boolean) {
    this.camera.setActive(isActive)
  }
}
