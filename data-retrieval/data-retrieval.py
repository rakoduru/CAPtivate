from kafka import KafkaConsumer
import time
import requests
from pymongo import MongoClient
import json
from kafka import KafkaProducer
import copy

mclient = MongoClient(port=27014)

db = mclient.weather_data

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
    for message in consumer:
        params = {
            'datasetid': 'GHCND',
            'units': 'metric',
            'datatypeid': ['TMAX', 'TMIN'],
            'includemetadata' : False
        }

        weather_req = message.value
        params['locationid']= weather_req['location_id']
        params['startdate'] = weather_req['date']
        params['enddate'] = weather_req['date']
        
        response = requests.get(url, params = params, headers = headers)
        # print(response.text)
        weather_result = json.loads(response.text)
        tmax = [field_data for field_data in weather_result['results'] if field_data['datatype'] =='TMAX']
        tmin = [field_data for field_data in weather_result['results'] if field_data['datatype'] =='TMIN']

        # print(tmax)
        # print(tmin)
        
        weather_details = {
            "user_id": weather_req['user_id'],
            "job_id": weather_req['job_id'],
            "location_id": weather_req['location_id'],
            "date": weather_req['date'],
            # Number of fields will improve
            "tmax": tmax[0]['value'],
            "tmin": tmin[0]['value']
        }
        print(weather_details)
        mongosend = copy.deepcopy(weather_details)
        result = db.weather.insert_one(mongosend)
        # introduce mock processing time
        # Todo: Sleep Asynchronously 
        time.sleep(30)
        producer.send('model-execution', value = weather_details)
