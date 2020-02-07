package airavata.github.captivate.apigateway

import cats.effect.{ExitCode, IO, IOApp}
import cats.implicits._

object Main extends IOApp {
  def run(args: List[String]) =
    ApigatewayServer.stream[IO].compile.drain.as(ExitCode.Success)
}