const log4js = require('log4js');
const connection = require('./sMysql');

/*
logger.trace('Entering cheese testing');
logger.debug('Got cheese.');
logger.info('Cheese is Gouda.');
logger.log('Something funny about cheese.');
logger.warn('Cheese is quite smelly.');
logger.error('Cheese %s is too ripe!', 'gouda');
logger.fatal('Cheese was breeding ground for listeria.');
*/

class MiscSingleton {
  log: any;
  constructor() {
    log4js.configure({
      appenders: {
        file: { type: 'file', filename: `serverLogs.log` },
        console: { type: 'console' },
      },
      categories: { default: { appenders: ['file', 'console'], level: 'debug' } }
    });
    this.log = log4js.getLogger();
    this.log.fatal('Server Started');
  }

  dbquery(query: string, parameters?: any) {
    return new Promise((r, j) => connection.query(query, parameters || null, (err: any, data: any) => {
      if (err) {
        this.log.error(query);
        return j(err);
      }
      if (query.startsWith('INSERT')) {
        r(data.insertId)
      }
      r(data);
    }))
  }

  async query(query: string, parameters?: any) {
    const start = new Date().getTime();
    const data = await this.dbquery(query, parameters);
    const time = new Date().getTime() - start;
    if (time >= 500) {
      this.log.warn(`'${query}' ends with: ${time / 1000}s`);
    }
    else {
      this.log.trace(`'${query}' ends with: ${time / 1000}s`);
    }
    return data;
  }

  escape(userData: string) {
    return connection.escape(userData)
  }

  roundNum(number: number, ends = 0) {
    return parseFloat(number.toFixed(ends));
  }

  isValueNumber(value: any) {
    if (typeof value !== 'number') return false;
    return true;
  }

  isValueString(value: any) {
    if (typeof value !== 'string') return false;
    return true;
  }

  getRandomInt(min = 0, max = 100) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  getPlayersInRange(position: Vector3Mp, range: number) {
    if (!this.isValueNumber(range)) return false;
    const players = mp.players.toArray();
    const playersInRange = [];
    for (const player of players) {
      if (player.dist(position) < range) {
        playersInRange.push(player);
      }
    }
    return playersInRange;
  }

  getNearestPlayerInRange(position: Vector3Mp, range: number) {
    const playersInRange = this.getPlayersInRange(position, range);
    if (!playersInRange) return false;
    let nearestPlayer = 0;
    for (const player of playersInRange) {
      if (player.dist(position) < playersInRange[nearestPlayer].dist(position)) {
        nearestPlayer = playersInRange.indexOf(player);
      }
    }
    return playersInRange[nearestPlayer];
  }

  getTime() {
    const currentTime = new Date();
    let h = currentTime.getHours();
    let m = currentTime.getMinutes();
    let s = currentTime.getSeconds();
    // if (h < 10) h = `0${h}`;
    // if (m < 10) m = `0${m}`;
    // if (s < 10) s = `0${s}`;
    // return `${h}:${m}:${s}`;
  }

  getPlayerByGuid(id: number) {
    const players = mp.players.toArray();
    for (const player of players) {
      // if (player.guid === id) return player;
    }
    return false;
  }

  getPlayerCoordJSON(player: PlayerMp) {
    const obj = {
      x: player.position.x,
      y: player.position.y,
      z: player.position.z,
      rot: player.heading,
      dim: player.dimension,
    }
    if (player.vehicle) obj.rot = player.vehicle.rotation.z;
    return JSON.stringify(obj);
  }

  convertDateToMYSQLFormat(date: Date) {
    return date.toISOString().slice(0, 19).replace('T', ' ');
  }

}
const miscSingleton = new MiscSingleton();
module.exports = miscSingleton;
