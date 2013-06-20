<?php
include('global-variables.php');

class database {

	// Connect to the database
	static function connect() {
		self::$error  = '';
		self::$mysqli = new mysqli(DB_HOST, DB_USER, DB_PASSWORD, DB_NAME);

		if (self::$mysqli->connect_errno) {
			this::$error = self::$mysqli->connect_errno . ' - ' . self::$mysqli->connect_error;
			self::close();
		}
	}

	// Close and discard of the database connection
	static function close() {
		mysql_close(self::$mysqli);
		self::$mysqli = '';
	}

	// Get any error returned from the Database
	static function get_error() {
		return self::$error;
	}

	// Query the database (user must close the connection afterwards)
	static function query($query) {
		$result = '';

		// If the database connection is not set, connect
		if(!self::$mysqli)
			self::connect();

		// If no connection issues, query
		if (!self::$error) {
			$result = self::$mysqli->query($query);

			if(self::$mysqli->error)
				$error = self::$mysqli->error . __LINE__;
		}

		return $result;
	}

	// Query the database, and then close the connection
	static function quick_query($query) {
		$result = self::query($query);
		self::close();
		return $result;
	}

	private static $error  = '';
	private static $mysqli = '';
}
?>