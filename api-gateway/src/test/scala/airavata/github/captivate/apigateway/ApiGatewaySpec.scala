package airavata.github.captivate.apigateway

import cats.effect.IO
import org.http4s._
import org.http4s.implicits._
import org.specs2.matcher.MatchResult

class ApiGatewaySpec extends org.specs2.mutable.Specification {

  // These tests should be improved as the api-gateway is improved

  "UserManagement" >> {
    "return 200" >> {
      uriReturns200()
    }
    "return Greeting" >> {
      uriReturnsGreeting()
    }
  }

  "Data Retrieval" >> {
    "return 200" >> {
      retData.status must beEqualTo(Status.Ok)
    }

    "trigger data retrieval" >> {
      retData.as[String].unsafeRunSync() must beEqualTo("Success")
    }
  }

  "Prediction service" >> {
    "return 200" >> {
      retPredict.status must beEqualTo(Status.Ok)
    }

    "trigger prediction" >> {
      retPredict.as[String].unsafeRunSync() must beEqualTo("Success")
    }
  }

  "Post processing" >> {
    "return 200" >> {
      retPostProcessing.status must beEqualTo(Status.Ok)
    }

    "trigger postprocessing" >> {
      retPostProcessing.as[String].unsafeRunSync() must beEqualTo("Success")
    }
  }

  private[this] val retGreeting: Response[IO] = {
    val getHW = Request[IO](Method.GET, uri"/usermanagement/Adithya")
    val userGreetings = UserManagement.impl[IO]
    ApigatewayRoutes.userManagementRoute(userGreetings, None).orNotFound(getHW).unsafeRunSync()
  }

  private[this] val retData: Response[IO] = {
    val getHW = Request[IO](Method.GET, uri"/data-retrieval")
    ApigatewayRoutes.dataRetrievalRoute[IO]().orNotFound(getHW).unsafeRunSync()
  }

  private[this] val retPredict: Response[IO] = {
    val getHW = Request[IO](Method.GET, uri"/predict")
    ApigatewayRoutes.predictionRoute[IO]().orNotFound(getHW).unsafeRunSync()
  }

  private[this] val retPostProcessing: Response[IO] = {
    val getHW = Request[IO](Method.GET, uri"/post-process")
    ApigatewayRoutes.postProcessingRoute[IO]().orNotFound(getHW).unsafeRunSync()
  }

  private[this] def uriReturns200(): MatchResult[Status] =
    retGreeting.status must beEqualTo(Status.Ok)

  private[this] def uriReturnsGreeting(): MatchResult[String] =
    retGreeting.as[String].unsafeRunSync() must beEqualTo("{\"greeting\":\"Welcome to Captivate, Adithya\"}")
}