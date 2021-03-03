import { logger } from '@server/helpers/default.logger'

const mysql = require('mysql2/promise')

const databaseConfig = {
	host: 'localhost',
	user: 'root',
	password: '',
	database: 'gta5',
}

const connection = mysql.createPool(databaseConfig)

// NOTE! all mysql queries here is unsecure! You should wrap all the data with connection.escape(data);
// More https://www.tizag.com/mysqlTutorial/mysql-php-sql-injection.php

connection.getConnection()
	.then((conn: any) => {
		logger.info('Successfully connected to the database')
		conn.release()
	}).catch((error: any) => {
		logger.error(`Error during connection to the database - ${error}`)
	})

/**
 * Run multiple queries on the database using a transaction. A list of SQL queries
 * should be provided, along with a list of values to inject into the queries.
 * @param  {array} queries      An array of mysql queries. These can contain `?`s
 *                              which will be replaced with values in `queryValues`.
 * @param  {array} queryValues  An array of arrays that is the same length as `queries`.
 *                              Each array in `queryValues` should contain values to
 *                              replace the `?`s in the corresponding query in `queries`.
 *                              If a query has no `?`s, an empty array should be provided.
 * @return {Promise}            A Promise that is fulfilled with an array of the
 *                              results of the passed in queries. The results in the
 *                              returned array are at respective positions to the
 *                              provided queries.
 */

const processTransaction = async (queries: string[], queryValues: any[]) => {
	if (queries.length !== queryValues.length) {
		return Promise.reject(
			'Number of provided queries did not match the number of provided query values arrays'
		)
	}
	const connection = await mysql.createConnection(databaseConfig)
	try {
		await connection.beginTransaction()
		const queryPromises: Promise<any>[] = []

		queries.forEach((query, index) => {
			queryPromises.push(connection.query(query, queryValues[index]))
		})
		const results = await Promise.all(queryPromises)
		await connection.commit()
		await connection.end()
		return results
	} catch (err) {
		await connection.rollback()
		await connection.end()
		return Promise.reject(err)
	}
}

export {
	connection,
	processTransaction
}
