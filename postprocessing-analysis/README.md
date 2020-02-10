Post-processing Analysis service:

Requirements:

1. To Run Kafka follow instructions from Readme file from Kafka.

2. Python 3 : [https://www.python.org/downloads/]

3. kafka-python ```pip install kafka-python``` and pymongo from ```pip install pymongo```

4. start Mongo container using

```
docker run -d -p 27020-27022:27017-27019 --name mongodb3 mongo:4.0.4
```

if you do not have mongo image already pull it from docker repo using

```
docker pull mongo:4.0.4
```


Running:

```python postprocessing-analysis.py```

#Producer is just for test purpose will be removed as service evolves.
To test with producer run producer at python producer.py

