var connection = require('../config/connection.js');

function printQuestionMarks(num) {
	var arr = [];

	for (var i = 0; i < num; i++) {
		arr.push('?');
	}

	return arr.toString();
}

function objtoSql(ob) {
	var arr = [];

	for(var key in ob) {
		arr.push(key + "=" + ob[key]);
	}

	return arr.toString();
}

var orm = {
	selectAll: function(table, cb) {
		var queryString = "SELECT * FROM " + table + ";";
		connection.query(queryString, function(err, result) {
			if(err) throw err;
			cb(result);
		});
	},
	insertOne: function(table, cols, vals, cb) {
		var queryString = "INSERT INTO " + table + " (" + cols.toString() + ") VALUES (" + printQuestionMarks(vals.length) + ") ";
		connection.query(queryString, vals, function(err, result) {
			if(err) throw err;
			cb(result);
		});
	},
	updateOne: function(table, objColVals, condition, cb) {
		var queryString = "UPDATE " + table + " SET " + objtoSql(objColVals) + " WHERE " + condition;
		connection.query(queryString, function(err, result) {
			if(err) throw err;
			cb(result);
		});
	},
	delete: function (table, condition, cb) {
		var queryString = 'DELETE FROM ' + table + ' WHERE ' + condition;
		connection.query(queryString, function (err, result) {
			if (err) throw err;
			cb(result);
		});
	}
}


module.exports = orm;