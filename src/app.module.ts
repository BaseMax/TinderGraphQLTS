import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo";
import { Module } from "@nestjs/common";
import { GraphQLModule } from "@nestjs/graphql";
import { ApolloServerPluginLandingPageLocalDefault } from "@apollo/server/plugin/landingPage/default";
import { join } from "path";
import { GraphQLError, GraphQLFormattedError } from "graphql";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { MongooseModule } from "@nestjs/mongoose";
import { AuthModule } from "./auth/auth.module";
import { UserModule } from "./user/user.module";
import { APP_FILTER } from "@nestjs/core";
import { GraphqlErrorFilter } from "./expection/error.handling";
import { MatchModule } from "./match/match.module";
import { ChatModule } from './chat/chat.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), "src/schema.gql"),
      playground: false,
      plugins: [ApolloServerPluginLandingPageLocalDefault()],
      formatError: (error: GraphQLError) => {
        const graphQLFormattedError: GraphQLFormattedError = {
          message:
            (error?.extensions?.exception as any)?.response?.message ||
            error?.message,
        };
        return graphQLFormattedError;
      },

      installSubscriptionHandlers: true,
      subscriptions: {
        "subscriptions-transport-ws": {
          path: "/graphql",
        },
      },
    }),

    MongooseModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        uri: configService.getOrThrow("DATABASE_URI"),
      }),

      inject: [ConfigService],
    }),
    AuthModule,
    UserModule,
    MatchModule,
    ChatModule,
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: GraphqlErrorFilter,
    },
  ],
})
export class AppModule {}
