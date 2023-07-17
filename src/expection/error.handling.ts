import {
  ArgumentsHost,
  Catch,
  HttpException,
  HttpStatus,
} from "@nestjs/common";
import { GqlArgumentsHost, GqlExceptionFilter } from "@nestjs/graphql";

@Catch()
export class GraphqlErrorFilter implements GqlExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const gqlHost = GqlArgumentsHost.create(host);
    const ctx = gqlHost.getContext();

    const errorResponse = {
      message: exception.message || "Internal server error",
    };

    const status = exception.status || HttpStatus.INTERNAL_SERVER_ERROR;
    throw new HttpException(errorResponse.message, status);
  }
}
