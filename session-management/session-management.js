const express = require('express')
const app = express()
const kafka = require("kafka-node")
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
var cors = require('cors');

const url = process.env.SESSION_MANAGEMENT_DB;

console.log(process.env.SESSION_MANAGEMENT_DB);

const mongo_client = new MongoClient(url);
var db;

mongo_client.connect(function(err, client) {
    assert.equal(null, err);
    console.log("Connected correctly to server");
    db = mongo_client.db("session-management"); 
})


Consumer = kafka.Consumer,
kafka_client = new kafka.KafkaClient({kafkaHost: process.env.KAFKA_SERVER})
consumer = new Consumer(kafka_client, [{ topic: "sessionmanagement"}, { topic: "session-update"}])

consumer.on("message", function(message) {
    console.log(message);
    let m = eval('(' + message.value + ')')
    if(message.topic == "sessionmanagement") {
        db.collection("sessions").insertOne(m)
    }
    else {
        let m = eval('(' + message.value + ')')
        db.collection("sessions").updateOne({"user_id": m.user_id, "job_id": m.job_id}, {$set : m})
    }
});

app.use(cors());
 
app.get('/getbyid', function (req, res) {
    var id = req.query.user_id
    console.log(id);
    db.collection("sessions").find({"user_id" : id}).toArray(function(err, result) {
    if (err) throw err;
    res.send(result);
    });
})
 
app.listen(3005)
