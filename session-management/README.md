### Session Management Service :

Requirements:
1. Install Nodejs and npm package (can be installed from https://nodejs.org/en/ any version greater than 9. Follow the instructions to download nodejs and npm)
------------

3. Start MongoDB container using

```
docker run -d -p 27023-27025:27017-27019 --name mongodb3 mongo:4.0.4
```

2.Run the command
```sh
npm install
```


3.Now run the command
```sh
npm start
```

4. Now you will be able to access the service through
```
http://localhost:3005/
```
