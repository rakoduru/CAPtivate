FROM openjdk:8
FROM maven:alpine
WORKDIR /usermgmt
COPY . /usermgmt
RUN mvn clean install -DskipTests
RUN mvn package -DskipTests
EXPOSE 8181
ENTRYPOINT ["java","-jar","/usermgmt/target/UserManagement-0.0.1-SNAPSHOT.jar"]