import { pool } from '@server/helpers/sMysql'
import { logger } from "@server/helpers/default.logger"

export default class QueryManager {
  public execute(query: string, parameters: any = null) {
    return this.queryProfiler(async () => {
      const res = await pool.execute(query, parameters)
      return res[0][0]
    }, query)
  }

  public query(query: string, parameters: any = null) {
    return this.queryProfiler(() => {
      return pool.getConnection()
        .then((conn: any) => {
          const res = conn.query(query, parameters)
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
    }, query)

  }

  private async queryProfiler(fn: () => any, query: string): Promise<any> {
    const start = Date.now()
    const data = await fn()
    const time = Date.now() - start
    this.log(query, time)
    return data
  }

  private log(query: string, time: number) {
    if (time >= 500) {
      logger.warn(`'${query}' ends with: ${time / 1000}s`)
    } else {
      logger.trace(`'${query}' ends with: ${time / 1000}s`)
    }
  }
}
