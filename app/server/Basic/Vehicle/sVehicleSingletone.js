
import { miscSingleton } from '@server/helpers/sMisc'
import Vehicle from './sVehicle'



class VehicleSingleton {
	constructor() {
		mp.events.addCommand({
			'veh': (player, fullText, vehicleModel) => {  // Temporary vehicle spawning
				const d = {
					model: vehicleModel,
					coord: miscSingleton.getPlayerCoordJSON(player),
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
					primaryColor: JSON.stringify([miscSingleton.getRandomInt(0, 159), miscSingleton.getRandomInt(0, 159), miscSingleton.getRandomInt(0, 159)]),
					secondaryColor: JSON.stringify([miscSingleton.getRandomInt(0, 159), miscSingleton.getRandomInt(0, 159), miscSingleton.getRandomInt(0, 159)]),
				}
				new Vehicle(d);
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
			number += possible.charAt(miscSingleton.getRandomInt(0, possible.length));
		}
		return number;
	}
}
export const vehicleSingleton = new VehicleSingleton();
