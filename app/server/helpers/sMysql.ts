import { logger } from '@server/helpers/default.logger'

const mysql = require('mysql2/promise')

const connection = mysql.createPool({
	host: 'localhost',
	user: 'root',
	password: '',
	database: 'gta5',
});

// NOTE! all mysql queries here is unsecure! You should wrap all the data with connection.escape(data);
// More https://www.tizag.com/mysqlTutorial/mysql-php-sql-injection.php

connection.getConnection(function (error: string) {
	if (error) {
		logger.error(`Error during connection to the database - ${error}`)
		throw error;
	} else {
		logger.log('Successfully connected to the database')
	}
})

export {
	connection
}
