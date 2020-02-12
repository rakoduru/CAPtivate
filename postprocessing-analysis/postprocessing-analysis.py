from kafka import KafkaConsumer
from pymongo import MongoClient

from kafka import KafkaProducer
import json
import copy

consumer = KafkaConsumer(
    'postprocessing-analysis',
     bootstrap_servers=['localhost:9092'],
     value_deserializer=lambda x: json.loads(x.decode('utf-8')))

producer = KafkaProducer(bootstrap_servers=['localhost:9092'],
                         value_serializer=lambda x: 
                         json.dumps(x, default = str).encode('utf-8'))

client = MongoClient('localhost:27020')
db = client.postprocess

while True:
    message = consumer.poll()
    if bool(message):
        _,v = message.popitem()
        weather = v[0].value
        print(weather)
        mongosend = copy.deepcopy(weather)
        result = db.weather.insert_one(mongosend)

        producer.send('session-update', value = weather)
