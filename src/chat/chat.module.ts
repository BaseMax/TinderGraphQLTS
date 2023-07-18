import { Module } from "@nestjs/common";
import { ChatService } from "./chat.service";
import { ChatResolver } from "./chat.resolver";
import { MongooseModule } from "@nestjs/mongoose";
import { Message, MessageSchema } from "./entities/chat.entity";
import { AuthModule } from "src/auth/auth.module";
import { MatchModule } from "src/match/match.module";

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: "messages",
        schema: MessageSchema,
      },
    ]),

    AuthModule,
    MatchModule,
  ],
  providers: [ChatResolver, ChatService],
})
export class ChatModule {}
