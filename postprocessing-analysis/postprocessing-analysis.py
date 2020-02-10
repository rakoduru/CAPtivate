from kafka import KafkaConsumer
from pymongo import MongoClient
from json import loads

consumer = KafkaConsumer(
    'postprocessing-analysis',
     bootstrap_servers=['localhost:9092'],
     value_deserializer=lambda x: loads(x.decode('utf-8')))

client = MongoClient('localhost:27020')
db = client.postprocess

while True:
    message = consumer.poll()
    if bool(message):
        postprocess.data.insert_one(message)
        print('{} added to {}'.format(message, db))
