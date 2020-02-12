### Session Management Service :

Requirements:
1. Install Nodejs and npm package (can be installed from https://nodejs.org/en/ any version greater than 9. Follow the instructions to download nodejs and npm)
------------

2. A Running kafka broker at `localhost:9092` with topics `sessionmanagement` and `session-update`.

3. Start MongoDB container using

```
docker run -d -p 27023-27025:27017-27019 --name sessionmanagementDB mongo:4.0.4
```

4.Run the command
```sh
npm install
```


5.Now run the command
```sh
npm start
```

6. Now you will be able to access the service through
```
http://localhost:3005/
```
