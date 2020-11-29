
const misc = require('../../helpers/sMisc');

const Vehicle = require('./sVehicle');



class VehicleSingleton {
	constructor() {
		mp.events.addCommand({
			'veh': (player, fullText, vehicleModel) => {  // Temporary vehicle spawning
				const d = {
					model: vehicleModel,
					coord: misc.getPlayerCoordJSON(player),
					id: 0,
					title: 'Pegassi Faggio',
					fuel: 1,
					fuelTank: 5,
					fuelRate: 2,
					price: 1,
					ownerId: 0,
					whoCanOpen: JSON.stringify([player.name]),
					factionName: '',
					numberPlate: this.generateRandomNumberPlate(),
					primaryColor: JSON.stringify([misc.getRandomInt(0, 159), misc.getRandomInt(0, 159), misc.getRandomInt(0, 159)]),
					secondaryColor: JSON.stringify([misc.getRandomInt(0, 159), misc.getRandomInt(0, 159), misc.getRandomInt(0, 159)]),
				}
				new Vehicle(d);
				misc.log.debug(`${player.name} spawned faggio2`);
			},

			'tp': (player, fullText, a, b, c) => {
				player.position = new mp.Vector3(+a, +b, +c);
			},

		});
	}

	generateRandomNumberPlate() {
		const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
		let number = '';
		for (let i = 0; i < 8; i++) {
			number += possible.charAt(misc.getRandomInt(0, possible.length));
		}
		return number;
	}
}
const vehicleSingleton = new VehicleSingleton();
module.exports = vehicleSingleton;
