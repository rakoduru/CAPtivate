### Model execution service

Dependencies:

TODO: Evolve the readme as you develop specifically

1. A Running kafka broker at `localhost:9092` with topic `model-execution`.

2. `Python 3` - [https://www.python.org/downloads/] (https://www.python.org/downloads/).

3. `kafka-python` & `pymongo` -

```
pip3 install kafka-python
pip3 install pymongo
```

4. start Mongo container using

```
docker run -d -p 27017-27019:27017-27019 --name modelexecutiondb mongo:4.0.4
```

if you do not have mongo image already pull it from docker repo using

```
docker pull mongo:4.0.4
```


#### Running

```sh
python3 model-execution.py
```