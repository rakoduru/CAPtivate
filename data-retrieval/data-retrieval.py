from kafka import KafkaConsumer
import time
import requests
from pymongo import MongoClient
import json
from kafka import KafkaProducer
import copy

mclient = MongoClient(port=27014)

db = mclient.foo2

producer = KafkaProducer(bootstrap_servers=['localhost:9092'],
                         value_serializer=lambda x: 
                         json.dumps(x, default = str).encode('utf-8'))

consumer = KafkaConsumer(
    'data-retrieval',
     bootstrap_servers=['localhost:9092'],
     value_deserializer=lambda x: json.loads(x.decode('utf-8')))

headers = {'token':'tlOrjLlVkdmPriWTBeKteqdOURnHqvjL'}
url ='https://www.ncdc.noaa.gov/cdo-web/api/v2/data'

while True:
    m = consumer.poll()
    # params = {'datasetid': 'GHCND', 'locationid':'ZIP:28801', 'startdate': '2010-05-01', 'enddate': '2010-05-01'}
    params = {'datasetid': 'GHCND', 'units': 'metric', 'datatypeid': 'TMAX', 'includemetadata' : False}
    if bool(m):
        _,v = m.popitem()
        params['locationid']= v[0].value['location_id']
        params['startdate'] = v[0].value['date']
        params['enddate'] = v[0].value['date']
        
        r = requests.get(url, params = params, headers = headers)
        bar = json.loads(r.text)
        tmax = {
            "user_id": v[0].value['user_id'],
            "job_id": v[0].value['job_id'],
            "location_id": v[0].value['location_id'],
            "date": v[0].value['date'],
            # Number of fields will improve
            "tmax": bar['results'][0]['value']
        }
        print(tmax)
        mongosend = copy.deepcopy(tmax)
        result = db.weather.insert_one(mongosend)
        # introduce mock processing time
        time.sleep(30)
        # print("From DB")
        # r = db.weather.find_one({'_id': result.inserted_id })
        # print(tmax)
        producer.send('model-execution', value = tmax)
