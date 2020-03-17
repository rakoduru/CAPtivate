FROM hseeberger/scala-sbt:8u222_1.3.5_2.13.1

WORKDIR /api-gateway
ADD . /api-gateway

EXPOSE 8080

RUN sbt compile

CMD sbt run