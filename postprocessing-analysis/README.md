Post-processing Analysis service:

Requirements:

1. To Run Kafka follow instructions from Readme file from Kafka.

2. Make sure that you have a kafka broker running at `localhost:9092` with topic `postpostprocessing-analysis`

2. Python 3 : [https://www.python.org/downloads/]

3. kafka-python ```pip install kafka-python``` and pymongo from ```pip install pymongo```

4. start Mongo container using

```
docker run -d -p 27020-27022:27017-27019 --name ppadb mongo:4.0.4
```

if you do not have mongo image already pull it from docker repo using

```
docker pull mongo:4.0.4
```

Running the project

```
python3 postprocessing-analysis.py
```
