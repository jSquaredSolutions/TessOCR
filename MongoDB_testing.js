var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
var fileName = './ScreenshotData.json';
var file2 = require(fileName);

console.log(file2[0]);

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("Screenshots_Database");
  dbo.collection("Screenshots_collection").insertMany(file2, function(err, res) {
    if (err) throw err;
    console.log("Number of documents inserted: " + res.insertedCount);
    db.close();
  });
});