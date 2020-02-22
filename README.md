## Team CAPtivate 

Interested on why the CAP is capitalised in the team name ? It's a cookie ... Checkout this [blog](https://mwhittaker.github.io/blog/an_illustrated_proof_of_the_cap_theorem/)  


### Contributing Guidelines 

Feel free to create issues and report bugs if you find something wrong in the project. Also, we accept pull requests but make sure you follow our contributing guidelines [here](docs/contributing.md)

### Maintainers

#### Adithya Selvaprithiviraj
#### Rasmitha Choudary Koduru
#### Shubhangi Shrivastava

---

#### Latest Release
Branch - **release/project1-0.0.1**

**Kindly pull code from the _release/project1-0.0.1_ branch for Assignment 1.**


#### Project Setup Instructions

Download or pull the repository in to your local machine. The following steps detail the steps needed to set up and run the project. 

```sh
git clone https://github.com/airavata-courses/CAPtivate.git
```

### Kafka and Zookeper Server Setup

Start Kafka and Zookeper servers by running the command root of repository

```
cd kafka
docker-compose up -d
```

This should create a kafka broker listening on `localhost:9092` with the following topics

```
usermanagement
sessionmanagement
session-update
data-retrieval
model-execution
postprocessing-analysis
```

### API Gateway Service

#### Software Requirements/Dependencies

In-order to run the service do the following.

- Download and install SBT for your machine from here  
    `https://www.scala-sbt.org/download.html`

- cd into the service folder  
    `cd api-gateway`

- Build the project by running  
    `sbt compile`

- You can run the service by executing  
    `sbt run`

- Inorder to build and run tests do
    ```
       sbt test:compile
       sbt test
    ```
	

### User Management Service

#### Software Requirements/Dependencies
- [Java 8](https://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html)
- [Tomcat Server v9.0](https://tomcat.apache.org/download-90.cgi) - Download the Windows Service Installer (32-bit/64-bit Windows Service Installer (pgp, sha512))
- [Maven](https://maven.apache.org/download.cgi) - Download the binary zip archive file
- MySQL
  - Option 1 - Download MySQL server on your local machine
    1. Download [MySQL Server](https://dev.mysql.com/downloads/installer/)
    2. Configure and set up the database as follows - 
        1. Create a datbase by the name of 'ads' in your mysql instance by running the following command MySQL.

        `create database ads;`
        2. In the applications.properties file of the repository (in the _'..\CAPtivateUserManagement\src\main\resources'_ folder), change the value of the following variables as per the settings of your MySQL instance.

          * spring.datasource.username=_<your_MySQL_root_username>_
          * spring.datasource.password=_<your_MySQL_root_password>_
        
  - Option 2 - Run the MySQL Server on Docker. (***RECOMMENDED***)
    1. Open a command prompt here and navigate to your repository's _'\UserManagement\db-docker'_ folder. 
    2. Use the following command to run a MySQL instance in the Docker system.
    ```sh
    docker-compose up
    ```
    3. Open a browser and type the following URL.
    
    `http://localhost:8081/`
    
    4. In the resulting page, enter the following values in the respective text fields to check DB connection.
        * Server: mysql-container
        * Username: root
        * Password: root.CAP2020
        * Database: ads_docker

#### Steps
After you've downloaded and installed the above in your system, follow these steps to run the Spring Boot application
1. Unzip maven to a desired location in your computer.
2. Define 'MAVEN_HOME' in your system variables. It would point to the location of the folder containining the Maven files unzipped in step 1. For eg. _'C:\User\apache-maven-3.6.3'_
3. Set path for Maven in your environment variables. It would contain the path upto the bin directory in the Maven folder (Step 2). For eg. _'C:\User\apache-maven-3.6.3\bin'_
4. Set JAVA_HOME variable (if not already present), to point to the JDK folder in the _'..\Program Files\Java'_ directory. Eg. _'C:\Program Files\Java\jdk1.8.0_241'_
5. Download and extract the code to your local machine. Open a command prompt and navigate to the folder UserManagement, which must contain the _pom.xml_.
6. Build the Spring Boot UserManagement Application with Maven by using either of the commands given below.

```sh
mvn install / mvn clean install
```
or

```sh
maven package
```

7. Run the application using Maven with the following command.

```sh
mvn spring-boot:run
```


### Session Management Service

#### Software Requirements/Dependencies

1. Install Nodejs and npm package (can be installed from https://nodejs.org/en/ any version greater than 9. Follow the instructions to download nodejs and npm)

2. Start MongoDB container using

```
docker run -d -p 27023-27025:27017-27019 --name sessionmanagementDB mongo:4.0.4
```

3. Run the command

```sh
npm install
```


4. Now run the command

```sh
npm start
```

5. Now you will be able to access the service through
```
http://localhost:3005/
```

### Data retrieval Service, Model Execution Service and Post-Processing and Analysis Service

#### Software Requirements/Dependencies

1. A Running kafka broker at `localhost:9092` with topic `data-retrieval`.

2. `Python 3` - [https://www.python.org/downloads/] (https://www.python.org/downloads/).

3. `kafka-python` & `pymongo` & `requests` -

```
pip3 install kafka-python
pip3 install pymongo
pip3 install requests
```

4. Start Mongo container using

	* DB instance for data retrieval service
	```
	docker run -d -p 27014-27016:27017-27019 --name dataretrievaldb mongo:4.0.4
	```
	
	* DB instance for model execution service

	```
	docker run -d -p 27017-27019:27017-27019 --name modelexecutiondb mongo:4.0.4
	```
	
	* DB instance for post-processing and analysis service

	```
	docker run -d -p 27020-27022:27017-27019 --name ppadb mongo:4.0.4
	```

_if you do not have mongo image already pull it from docker repo using_

```
docker pull mongo:4.0.4
```


5. Run the scripts as follows from root of repository

#### Linux/Mac

```sh
cd data-retrieval
python3 data-retrieval.py
```

```sh
cd model-execution
python3 model-execution.py
```

```sh
cd postprocessing-analysis
python3 postprocessing-analysis.py
```


### User Interface

1. Navigate to the folder 'WeatherApp'

2. Run the command `npm install`.

	This will install all the dependent packages for the ui to run.

3.Now run the command `npm start`.

	This will open the browser and your app will be running at `http://localhost:3000/`
