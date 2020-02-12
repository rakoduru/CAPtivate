from kafka import KafkaConsumer
import time
from pymongo import MongoClient
from kafka import KafkaProducer
import json
import copy

mclient = MongoClient(port=27017)

db = mclient.foo

producer = KafkaProducer(bootstrap_servers=['localhost:9092'],
                         value_serializer=lambda x: 
                         json.dumps(x, default = str).encode('utf-8'))

consumer = KafkaConsumer(
    'model-execution',
     bootstrap_servers=['localhost:9092'],
     value_deserializer=lambda x: json.loads(x.decode('utf-8')))

while True:
    m = consumer.poll()
    
    if bool(m):
        # print(m)
        _,v = m.popitem()
        weather = v[0].value
        print(weather)
        mongosend = copy.deepcopy(weather)
        result = db.weather.insert_one(mongosend)
        # print(result.inserted_id)
        # print("Inside DB")
        # print(db.model.find_one({"_id": result.inserted_id}))
        producer.send('postprocessing-analysis', value = weather)
              

        

    

    
        
