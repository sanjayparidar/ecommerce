var connection = require('../config/connect');
var config = require("../config/db");


module.exports.findWhere=function(obj, cb){
	connection.init(function(err, client){
		
		var db = client.db(config.dbName);
		
		db.collection('admin').find(obj).toArray(cb);
	});
}

module.exports.updateWhere=function(where, obj, cb){
	connection.init(function(err, client){
		var db = client.db(config.dbName);
		db.collection('admin').update(where, {$set : obj}, cb);
	});
}

module.exports.find=function(cb){
	connection.init(function(err, client){
		var db = client.db(config.dbName);
		db.collection('admin').find().toArray(cb);
	});
}