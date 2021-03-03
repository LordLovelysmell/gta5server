import { connection, processTransaction } from '@server/helpers/sMysql'
import { logger } from '@server/helpers/default.logger'

class MiscSingleton {
  dbquery(query: string, parameters?: any) {
    // return new Promise((r, j) => connection.query(query, parameters || null, (err: any, data: any) => {
    //   if (err) {
    //     logger.error(query)
    //     return j(err)
    //   }
    //   if (query.startsWith('INSERT')) {
    //     r(data.insertId)
    //   }
    //   r(data)
    // }))
    return connection.getConnection()
      .then((conn: any) => {
        const res = conn.query(query, parameters || null)
        conn.release()
        return res
      }).then((result: any) => {
        if (query.startsWith('INSERT')) {
          return result[0][0].insertId
        }
        return result[0][0]
      }).catch((error: any) => {
        logger.error(error)
      });
  }

  async query(query: string, parameters?: any): Promise<any> {
    const start = Date.now()
    const data = await this.dbquery(query, parameters)
    const time = Date.now() - start
    this.logQueryInfo(query, time)
    return data
  }

  async processTransactionQuery(queries: string[], queryValues: any[]) {
    const start = Date.now()
    const data = await processTransaction(queries, queryValues)
    const time = Date.now() - start
    this.logQueryInfo(`Query transaction (first query - '${queries[0]}')`, time)
    return data
  }

  logQueryInfo(query: string, time: number) {
    if (time >= 500) {
      logger.warn(`'${query}' ends with: ${time / 1000}s`)
    } else {
      logger.trace(`'${query}' ends with: ${time / 1000}s`)
    }
  }

  escape(userData: string) {
    return connection.escape(userData)
  }

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
