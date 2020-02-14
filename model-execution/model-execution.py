from kafka import KafkaConsumer
import time
from pymongo import MongoClient
from kafka import KafkaProducer
import json
import copy

mclient = MongoClient(port=27017)

db = mclient.model_result

producer = KafkaProducer(bootstrap_servers=['localhost:9092'],
                         value_serializer=lambda x: 
                         json.dumps(x, default = str).encode('utf-8'))

consumer = KafkaConsumer(
    'model-execution',
     bootstrap_servers=['localhost:9092'],
     value_deserializer=lambda x: json.loads(x.decode('utf-8')))

while True:
    for message in consumer:
        weather = message.value

        # Account for global warming ;)
        # Todo: Improve prediction Algorithm 
        weather["tmax"] += 1.8

        print(weather)

        mongosend = copy.deepcopy(weather)
        result = db.weather.insert_one(mongosend)
        
        producer.send('postprocessing-analysis', value = weather)
              

        

    

    
        
