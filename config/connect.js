var MongoClient =  require('mongodb').MongoClient;
var url = "mongodb+srv://sanjaypatidar:Sanjaypatidar95@cluster0-hoh7m.mongodb.net/test?retryWrites=true"

module.exports.init=function(cb){
	MongoClient.connect(url, cb);
	
}