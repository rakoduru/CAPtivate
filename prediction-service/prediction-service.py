from kafka import KafkaConsumer
import time
from pymongo import MongoClient

mclient = MongoClient(port=27017)

db = mclient.foo

consumer = KafkaConsumer(
    'test',
     bootstrap_servers=['localhost:9092'],
     value_deserializer=lambda x: x.decode('utf-8'))

count = 0

while True:
    time.sleep(0.5)
    m = consumer.poll()
    
    if bool(m):
        # print(m)
        _,v = m.popitem()
        bar = {
            'id' : count,
            'message' : v[0].value
        }
        result = db.btable.insert_one(bar)
        # print(result.inserted_id)
        print("Inside DB")
        print(db.btable.find_one({"id": count}))

        count += 1
              

        

    

    
        
