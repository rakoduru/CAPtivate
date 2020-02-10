from time import sleep
from json import dumps
from kafka import KafkaProducer

producer = KafkaProducer(bootstrap_servers=['localhost:9092'],value_serializer=lambda x: dumps(x).encode('utf-8'))

#test code for initial setup
for e in range(1000):
    data = {'number' : e}
    producer.send('postprocessing_analysis', value=data)
    sleep(5)