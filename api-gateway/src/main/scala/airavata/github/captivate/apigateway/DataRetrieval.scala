package airavata.github.captivate.apigateway

import airavata.github.captivate.apigateway.SessionManagement.Session
import cats.Applicative
import cats.effect.Sync
import io.circe.{Decoder, Encoder}
import io.circe.generic.semiauto.{deriveDecoder, deriveEncoder}
import org.http4s.{EntityDecoder, EntityEncoder}
import org.http4s.circe.{jsonEncoderOf, jsonOf}

// TODO: Use later to decode message and validate

case class DataRetrieval(locationid: String, startdate: String, enddate: String)

object DataRetrieval {
  implicit val dataRetrievalDecoder: Decoder[DataRetrieval] = deriveDecoder[DataRetrieval]
  implicit def dataRetrievalEntityDecoder[F[_]: Sync]: EntityDecoder[F, DataRetrieval] =
    jsonOf
  implicit val dataRetrievalEncoder: Encoder[DataRetrieval] = deriveEncoder[DataRetrieval]
  implicit def dataRetrievalEntityEncoder[F[_]: Applicative]: EntityEncoder[F, DataRetrieval] =
    jsonEncoderOf
}
