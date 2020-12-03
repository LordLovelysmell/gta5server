const mysql = require('mysql');

const connection = mysql.createPool({
	host: 'localhost',
	user: 'root',
	password: '',
	database: 'gta5',
});

// NOTE! all mysql queries here is unsecure! You should wrap all the data with connection.escape(data);
// More https://www.tizag.com/mysqlTutorial/mysql-php-sql-injection.php

connection.getConnection(function (error) {
	if (error) {
		console.error(`Error during connection to the database - ${error}`);
		throw error;
	} else {
		console.log('Successfully connected to the database');
	}
});

module.exports = connection;
