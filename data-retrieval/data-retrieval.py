from kafka import KafkaConsumer
import time
import requests
from pymongo import MongoClient
import json
from kafka import KafkaProducer
import copy
from datetime import datetime
import os

consumer = KafkaConsumer(
    'data-retrieval',
     bootstrap_servers=[os.environ['KAFKA_SERVER']],
     value_deserializer=lambda x: json.loads(x.decode('utf-8')))

producer = KafkaProducer(bootstrap_servers=[os.environ['KAFKA_SERVER']],
                         value_serializer=lambda x: 
                         json.dumps(x, default = str).encode('utf-8'))


mclient = MongoClient(os.environ['DATA_RETRIEVAL_DB'])
db = mclient.weather_data

headers = {'token':'tlOrjLlVkdmPriWTBeKteqdOURnHqvjL'}
url ='https://www.ncdc.noaa.gov/cdo-web/api/v2/data'

while True:
    for message in consumer:
        weather_req = message.value
        try:
            params = {
                'datasetid': 'GHCND',
                'units': 'metric',
                'datatypeid': ['TMAX', 'TMIN'],
                'includemetadata' : False
            }


            parsed_date = datetime.strptime(weather_req['date'], "%Y-%m-%d")

            if parsed_date > datetime.today() :
                req_date = parsed_date.replace(year = 2005)
                req_date = datetime.strftime(req_date, "%Y-%m-%d")
            else :
                req_date = parsed_date
                req_date = datetime.strftime(req_date, "%Y-%m-%d")

            
            params['locationid']= weather_req['location_id']
            params['startdate'] = req_date
            params['enddate'] = req_date

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
                "status": "Done",
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
        except Exception as e:
            print(e)
            error_details = {
                "user_id": weather_req['user_id'],
                "job_id": weather_req['job_id'],
                "location_id": weather_req['location_id'],
                "date": weather_req['date'],
                "status": "Error",
                # Number of fields will improve
                "error": "There was an error processing your query"
            }
            print(error_details)
            mongosend = copy.deepcopy(error_details)
            result = db.weather.insert_one(mongosend)
            producer.send('session-update', value = error_details)
                    
