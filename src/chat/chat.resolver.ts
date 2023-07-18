import { Resolver, Query, Mutation, Args, Int } from "@nestjs/graphql";
import { ChatService } from "./chat.service";
import { Message } from "./entities/chat.entity";
import { CreateMessageInput } from "./dto/create-Message.input";
import { UpdateChatInput } from "./dto/update-Message";
import { UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/guards/jwt.auth.guard";
import { GetCurrentUserId } from "src/decorators/get.courent.userId";

@Resolver(() => Message)
export class ChatResolver {
  constructor(private readonly chatService: ChatService) {}

  @UseGuards(JwtAuthGuard)
  @Mutation(() => Message)
  createChat(
    @Args("createChatInput") createChatInput: CreateMessageInput,
    @GetCurrentUserId() userId: string
  ) {
    return this.chatService.create(userId, createChatInput);
  }

  @UseGuards(JwtAuthGuard)
  @Query(() => [Message], { name: "getAllMessageInAMatch" })
  findAll(
    @Args("matchId") matchId: string,
    @GetCurrentUserId() userId: string
  ) {
    return this.chatService.findAll(matchId, userId);
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => Message)
  removeChat(
    @Args("messageId") messageId: string,
    @GetCurrentUserId() userId: string
  ) {
    return this.chatService.remove(messageId, userId);
  }
}
