class ATM {
  constructor() {
    mp.events.add({
      "playerEnterColshape": (player: PlayerMp, shape: ColshapeMp) => {
        if (player.vehicle || !shape.getVariable('isATM')) return;
        player.notify('Банкомат');
      },
    })
  }

  createATMByCoords(x: number, y: number, z: number) {
    const shape = mp.colshapes.newSphere(x, y, z, 0.5);
    shape.setVariable('isATM', true)
    mp.blips.new(500, new mp.Vector3(x, y, z),
      {
        name: "ATM",
        color: 2,
        shortRange: true,
        scale: 0.75,
      });
  }

  loadATMs() {
    this.createATMByCoords(-95.54, 6457.14, 31.46);
    this.createATMByCoords(-97.26, 6455.38, 31.46);
    this.createATMByCoords(155.828, 6642.827, 31.602);
    this.createATMByCoords(174.161, 6637.827, 31.573);
    this.createATMByCoords(1701.28, 6426.46, 32.76);
    this.createATMByCoords(112.483, -818.976, 31.342);
    this.createATMByCoords(111.323, -775.486, 31.437);
    this.createATMByCoords(114.181, -776.757, 31.418);
    this.createATMByCoords(296.444, -893.988, 29.231);
    this.createATMByCoords(295.694, -896.069, 29.214);
    this.createATMByCoords(147.726, -1035.783, 29.343);
    this.createATMByCoords(145.947, -1035.146, 29.345);
    this.createATMByCoords(289.01, -1256.83, 29.441);
    this.createATMByCoords(1703, 4933.5, 42.06);
    this.createATMByCoords(1968.13, 3743.56, 32.34);
    this.createATMByCoords(2683, 3286.5, 55.21);
    this.createATMByCoords(-611.92, -704.75, 31.26);
    this.createATMByCoords(-614.6, -704.75, 31.26);
  }

}

const atmSingletone = new ATM();
atmSingletone.loadATMs();
