import QueryManager from "@server/core/QueryManager"

const queryManager = new QueryManager()

export class Auth {

  // TODO: Find out why queryProfiler doesn't log messages
  static fetchUserByLogin(login: string): any {
    return queryManager.execute('SELECT id, login, password, position, socialclub FROM player WHERE login = ' + login + ' LIMIT 1')
  }
}
