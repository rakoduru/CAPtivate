const express = require('express')
const app = express()
const kafka = require("kafka-node")
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

const url = 'mongodb://localhost:27023';

const mongo_client = new MongoClient(url);
var db;

mongo_client.connect(function(err, client) {
    assert.equal(null, err);
    console.log("Connected correctly to server");
    db = mongo_client.db("session-management"); 
})


Consumer = kafka.Consumer,
kafka_client = new kafka.KafkaClient()
consumer = new Consumer(kafka_client, [{ topic: "sessionmanagement"}, { topic: "session-update"}])

consumer.on("message", function(message) {
    console.log(message);
    if(message.topic == "sessionmanagement") {
        db.collection("sessions").insertOne(message)
    }
    else {
        let m = eval('(' + message.value + ')')
        db.collection("sessions").updateOne({"id": m.id}, {$set : m})
    }
});
 
app.get('/', function (req, res) {
  res.send('Hello from session management')
})
 
app.listen(3005)
