import { Module } from "@nestjs/common";
import { MatchService } from "./match.service";
import { MatchResolver } from "./match.resolver";
import { AuthModule } from "src/auth/auth.module";
import { MongooseModule } from "@nestjs/mongoose";
import { MatchSchema } from "./entities/match.entity";

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: "matches",
        schema: MatchSchema,
      },
    ]),
    AuthModule,
  ],
  providers: [MatchResolver, MatchService],
  exports: [MatchService],
})
export class MatchModule {}
