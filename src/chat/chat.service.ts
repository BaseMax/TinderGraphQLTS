import {
  ForbiddenException,
  HttpException,
  HttpStatus,
  Injectable,
} from "@nestjs/common";
import { CreateMessageInput } from "./dto/create-Message.input";
import { UpdateChatInput } from "./dto/update-Message";
import { InjectModel } from "@nestjs/mongoose";
import { MessageDocument } from "./interfaces/message.interface";
import mongoose, { Model } from "mongoose";
import { MatchService } from "src/match/match.service";

@Injectable()
export class ChatService {
  constructor(
    @InjectModel("messages") private messageModel: Model<MessageDocument>,
    private readonly matchService: MatchService
  ) {}

  async create(
    senderId: string,
    createMessageInput: CreateMessageInput
  ): Promise<MessageDocument> {
    return await this.messageModel.create({
      senderId: senderId,
      content: createMessageInput.content,
      matchId: createMessageInput.matchId,
    });
  }

  async findAll(matchId: string, userId: string): Promise<MessageDocument[]> {
    const isInMatch = await this.matchService.isUserInMatch(matchId, userId);

    if (!isInMatch)
      throw new ForbiddenException(
        "you aren't part of this match to read messages"
      );

    return await this.messageModel.find({
      matchId: new mongoose.Types.ObjectId(matchId),
    });
  }

  async findOneOrThrowError(id: string): Promise<MessageDocument> {
    const message = await this.messageModel.findOne({
      _id: new mongoose.Types.ObjectId(id),
    });

    if (!message) {
      throw new HttpException(
        "there is no message with provided credential",
        HttpStatus.NOT_FOUND
      );
    }

    return message;
  }

  update(id: number, updateChatInput: UpdateChatInput) {
    return `This action updates a #${id} chat`;
  }

  async remove(messageId: string, userId: string) {
    const message = await this.findOneOrThrowError(messageId);

    const isItAllowedToDelete =
      message.senderId.toString() === userId ? true : false;

    if (!isItAllowedToDelete) {
      throw new ForbiddenException(
        "you don't have permission to delete  this  message"
      );
    }

    return await this.messageModel.findOneAndDelete({
      _id: new mongoose.Types.ObjectId(messageId),
    });
  }
}
