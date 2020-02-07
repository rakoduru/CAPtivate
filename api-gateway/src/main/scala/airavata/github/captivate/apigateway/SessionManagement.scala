package airavata.github.captivate.apigateway

import cats.Applicative
import cats.effect.Sync
import cats.implicits._
import io.circe.{Encoder, Decoder, Json, HCursor}
import io.circe.generic.semiauto._
import org.http4s._
import org.http4s.implicits._
import org.http4s.{EntityDecoder, EntityEncoder, Method, Uri, Request}
import org.http4s.circe._

trait SessionManagement[F[_]]{
  def get: F[SessionManagement.Session]
}

object SessionManagement {
  def apply[F[_]](implicit ev: SessionManagement[F]): SessionManagement[F] = ev

  final case class Session(id: String) extends AnyVal
  object Session {
    implicit val sessionDecoder: Decoder[Session] = deriveDecoder[Session]
    implicit def sessionEntityDecoder[F[_]: Sync]: EntityDecoder[F, Session] =
      jsonOf
    implicit val sessionEncoder: Encoder[Session] = deriveEncoder[Session]
    implicit def sessionEntityEncoder[F[_]: Applicative]: EntityEncoder[F, Session] =
      jsonEncoderOf
  }

  final case class SessionError(e: Throwable) extends RuntimeException

  def impl[F[_]: Applicative]: SessionManagement[F] = new SessionManagement[F] {
    def get: F[SessionManagement.Session] = {
      Session("Test").pure[F]
    }
  }
}