### Data retrieval service

Dependencies:

TODO: Evolve the readme as you develop specifically

1. A Running kafka broker at `localhost:9092` with topic `test`.

2. `Python 3` - [https://www.python.org/downloads/] (https://www.python.org/downloads/).

3. `kafka-python` & `pymongo` & `requests` -

```
pip3 install kafka-python
pip3 install pymongo
pip3 install requests
```

4. start Mongo container using

```
docker run -d -p 27014-27016:27017-27019 --name mongodb2 mongo:4.0.4
```

if you do not have mongo image already pull it from docker repo using

```
docker pull mongo:4.0.4
```


#### Running

```sh
python3 data-retrieval.py
```