## Steps to run User Management service

### Method 1

#### Software requirements/dependencies
[Docker](https://www.docker.com/products/docker-desktop)

#### Steps
Open a command prompt and navigate to the directory UserManagement in the folder containing the project code. Run the following command

```sh
docker-compose up -d
```

### Method 2

#### Software requirements/dependencies
- [Java 8](https://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html)
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
    
    4. In the resulting page, enter the following values in the respective text fields.
        * Server: mysql-container
        * Username: root
        * Password: root.CAP2020
        * Database: ads_docker

#### Steps
After you've downloaded and installed the above in your system, follow these steps to run the Spring Boot application
1. Unzip maven to a desired location in your computer.
2. Define 'MAVEN_HOME' in your system variables. It would point to the location of the folder containining the Maven files unzipped in step 2. For eg. _'C:\User\apache-maven-3.6.3'_
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
