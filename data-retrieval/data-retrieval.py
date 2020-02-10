from kafka import KafkaConsumer
import time
import requests
from pymongo import MongoClient
import json

mclient = MongoClient(port=27014)

db = mclient.foo2

consumer = KafkaConsumer(
    'data-retrieval',
     bootstrap_servers=['localhost:9092'],
     value_deserializer=lambda x: json.loads(x.decode('utf-8')))

headers = {'token':'tlOrjLlVkdmPriWTBeKteqdOURnHqvjL'}
url ='https://www.ncdc.noaa.gov/cdo-web/api/v2/data'

while True:
    m = consumer.poll()
    # params = {'datasetid': 'GHCND', 'locationid':'ZIP:28801', 'startdate': '2010-05-01', 'enddate': '2010-05-01'}
    params = {'datasetid': 'GHCND', 'units': 'metric'}
    if bool(m):
        _,v = m.popitem()
        params['locationid']= v[0].value['locationid']
        params['startdate'] = v[0].value['startdate']
        params['enddate'] = v[0].value['startdate']
        
        r = requests.get(url, params = params, headers = headers)
        bar = json.loads(r.text)
        result = db.weather.insert_one(bar)
        print("From DB")
        r = db.weather.find_one({'_id': result.inserted_id })
        print(r)
