package airavata.github.captivate.apigateway

import cats.effect.Sync
import cats.implicits._
import org.http4s.HttpRoutes
import org.http4s.dsl.Http4sDsl

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

  def userManagementRoute[F[_]: Sync](H: UserManagement[F]): HttpRoutes[F] = {
    val dsl = new Http4sDsl[F]{}
    import dsl._
    HttpRoutes.of[F] {
      case GET -> Root / "usermanagement" / name =>
        for {
          greeting <- H.greet(UserManagement.Name(name, ""))
          resp <- Ok(greeting)
        } yield resp
    }
  }
}