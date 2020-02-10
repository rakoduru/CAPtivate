package airavata.github.captivate.apigateway

import cats.effect.Sync
import cats.implicits._
import org.http4s.HttpRoutes
import org.http4s.dsl.Http4sDsl
import org.apache.kafka.clients.producer.{KafkaProducer, ProducerRecord}

object ApigatewayRoutes {

  def sessionRoute[F[_]: Sync](S: SessionManagement[F]): HttpRoutes[F] = {
    val dsl = new Http4sDsl[F]{}
    import dsl._
    HttpRoutes.of[F] {
      case GET -> Root / "sessions" =>
        for {
          sessions <- S.get
          resp <- Ok(sessions)
        } yield resp
    }
  }

  def userManagementRoute[F[_]: Sync](H: UserManagement[F] , producer: Option[KafkaProducer[String, String]]): HttpRoutes[F] = {
    val dsl = new Http4sDsl[F]{}
    import dsl._
    HttpRoutes.of[F] {
      case GET -> Root / "usermanagement" / name =>
        for {
          greeting <- H.greet(UserManagement.Name(name, ""))
          _ = producer.map {
            p => p.send(new ProducerRecord[String, String]("test", name))
          }
          resp <- Ok(greeting)
        } yield resp
    }
  }

  def dataRetrievalRoute[F[_]: Sync](producer: Option[KafkaProducer[String, String]]): HttpRoutes[F] = {
    val dsl = new Http4sDsl[F]{}
    import dsl._
    HttpRoutes.of[F] {
      case req@ POST -> Root / "data-retrieval"  => req.decode[String] { data =>
        for {
          resp <- Ok("Success")
          _ = producer.map {
            p =>
              p.send(new ProducerRecord[String, String]("data-retrieval", data))
          }
        } yield resp
      }
    }
  }

  def predictionRoute[F[_]: Sync](): HttpRoutes[F] = {
    val dsl = new Http4sDsl[F]{}
    import dsl._
    HttpRoutes.of[F] {
      case GET -> Root / "predict"  =>
        for {
          resp <- Ok("Success")
        } yield resp
    }
  }

  def postProcessingRoute[F[_]: Sync](): HttpRoutes[F] = {
    val dsl = new Http4sDsl[F]{}
    import dsl._
    HttpRoutes.of[F] {
      case GET -> Root / "post-process"  =>
        for {
          resp <- Ok("Success")
        } yield resp
    }
  }

}