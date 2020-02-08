package airavata.github.captivate.apigateway

import java.util.Properties

import cats.effect.{ConcurrentEffect, ContextShift, Timer}
import cats.implicits._
import fs2.Stream
import org.http4s.client.blaze.BlazeClientBuilder
import org.http4s.implicits._
import org.http4s.server.blaze.BlazeServerBuilder
import org.http4s.server.middleware.Logger
import org.apache.kafka.clients.producer.{KafkaProducer, ProducerRecord}

import scala.concurrent.ExecutionContext.global

object ApigatewayServer {

  val properties:Properties = new Properties()
  properties.put("bootstrap.servers","localhost:9092")
  properties.put("key.serializer","org.apache.kafka.common.serialization.StringSerializer")
  properties.put("value.serializer", "org.apache.kafka.common.serialization.StringSerializer")
  properties.put("acks","all")
  
  // TODO: Close the producer gracefully when the server exits
  val producer = new KafkaProducer[String, String](properties)

  val topic = "test"

  def stream[F[_]: ConcurrentEffect](implicit T: Timer[F], C: ContextShift[F]): Stream[F, Nothing] = {
    for {
      client <- BlazeClientBuilder[F](global).stream
      userAlg = UserManagement.impl[F]
      sessionAlg = SessionManagement.impl[F]

      httpApp = (
        ApigatewayRoutes.userManagementRoute[F](userAlg, Some(producer)) <+>
        ApigatewayRoutes.sessionRoute[F](sessionAlg)
      ).orNotFound

      // With Middlewares in place
      finalHttpApp = Logger.httpApp(true, true)(httpApp)

      exitCode <- BlazeServerBuilder[F]
        .bindHttp(8080, "0.0.0.0")
        .withHttpApp(finalHttpApp)
        .serve
    } yield exitCode
  }.drain
}
