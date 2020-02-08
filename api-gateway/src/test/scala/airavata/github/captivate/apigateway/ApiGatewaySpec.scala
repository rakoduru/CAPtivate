package airavata.github.captivate.apigateway

import cats.effect.IO
import org.http4s._
import org.http4s.implicits._
import org.specs2.matcher.MatchResult

class ApiGatewaySpec extends org.specs2.mutable.Specification {

  "UserManagement" >> {
    "return 200" >> {
      uriReturns200()
    }
    "return Greeting" >> {
      uriReturnsGreeting()
    }
  }

  private[this] val retGreeting: Response[IO] = {
    val getHW = Request[IO](Method.GET, uri"/usermanagement/Adithya")
    val userGreetings = UserManagement.impl[IO]
    ApigatewayRoutes.userManagementRoute(userGreetings, None).orNotFound(getHW).unsafeRunSync()
  }

  private[this] def uriReturns200(): MatchResult[Status] =
    retGreeting.status must beEqualTo(Status.Ok)

  private[this] def uriReturnsGreeting(): MatchResult[String] =
    retGreeting.as[String].unsafeRunSync() must beEqualTo("{\"greeting\":\"Welcome to Captivate, Adithya\"}")
}