from kafka import KafkaConsumer
from pymongo import MongoClient
import os

from kafka import KafkaProducer
import json
import copy

consumer = KafkaConsumer(
    'postprocessing-analysis',
     bootstrap_servers=[os.environ['KAFKA_SERVER']],
     value_deserializer=lambda x: json.loads(x.decode('utf-8')))

producer = KafkaProducer(bootstrap_servers=[os.environ['KAFKA_SERVER']],
                         value_serializer=lambda x: 
                         json.dumps(x, default = str).encode('utf-8'))

client = MongoClient(os.environ['POST_PROCESSING_DB'])
db = client.postprocess

# Todo: Improve this
def comment_on_weather(tmax, tmin):
    if (tmax > 25):
        return "It is a Hot day"
    elif(tmin < 5):
        return "The day is too cold"
    else:
        return "Its a gloomy day"
        

while True:
    for message in consumer:
        
        weather = message.value

        weather["comment"] = comment_on_weather(weather['tmax'],weather['tmin'])

        print(weather)
        
        mongosend = copy.deepcopy(weather)
        
        result = db.post_process.insert_one(mongosend)

        producer.send('session-update', value = weather)
