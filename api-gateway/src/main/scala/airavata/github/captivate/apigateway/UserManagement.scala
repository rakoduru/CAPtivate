package airavata.github.captivate.apigateway

import cats.Applicative
import cats.implicits._
import io.circe.{Encoder, Json}
import org.http4s.EntityEncoder
import org.http4s.circe._

trait UserManagement[F[_]]{
  def greet(n: UserManagement.Name): F[UserManagement.Greeting]
}

object UserManagement {
  implicit def apply[F[_]](implicit ev: UserManagement[F]): UserManagement[F] = ev

  final case class Name(first_name: String, last_name: String)

  final case class Greeting(greeting: String) extends AnyVal
  object Greeting {
    implicit val greetingEncoder: Encoder[Greeting] = new Encoder[Greeting] {
      final def apply(a: Greeting): Json = Json.obj(
        ("greeting", Json.fromString(a.greeting)),
      )
    }
    implicit def greetingEntityEncoder[F[_]: Applicative]: EntityEncoder[F, Greeting] =
      jsonEncoderOf[F, Greeting]
  }

  def impl[F[_]: Applicative]: UserManagement[F] = new UserManagement[F]{
    def greet(n: UserManagement.Name): F[UserManagement.Greeting] =
        Greeting("Welcome to Captivate, " + n.first_name).pure[F]
  }
}