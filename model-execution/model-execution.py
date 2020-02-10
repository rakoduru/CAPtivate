from kafka import KafkaConsumer
import time
from pymongo import MongoClient
import json

mclient = MongoClient(port=27017)

db = mclient.foo

consumer = KafkaConsumer(
    'model-execution',
     bootstrap_servers=['localhost:9092'],
     value_deserializer=lambda x: json.loads(x.decode('utf-8')))

while True:
    m = consumer.poll()
    
    if bool(m):
        # print(m)
        _,v = m.popitem()
        bar = v[0].value
        result = db.model.insert_one(bar)
        # print(result.inserted_id)
        print("Inside DB")
        print(db.model.find_one({"_id": result.inserted_id}))
              

        

    

    
        
