import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Injectable,
} from "@nestjs/common";
import {
  CreateMatchInput,
  NormalizedMatchInput,
} from "./dto/create-match.input";
import { UpdateMatchInput } from "./dto/update-match.input";
import { InjectModel } from "@nestjs/mongoose";
import mongoose, { Model } from "mongoose";
import { MatchDocument } from "./interfaces/match.document";

@Injectable()
export class MatchService {
  constructor(
    @InjectModel("matches") private matchModel: Model<MatchDocument>
  ) {}
  async create(createMatchDto: CreateMatchInput): Promise<MatchDocument> {
    const thereIsAMatch = await this.areInMatch(createMatchDto);

    if (thereIsAMatch) {
      return thereIsAMatch;
    }
    const orderedUser = this.setNormalizeOrder(createMatchDto);
    return await this.matchModel.create(orderedUser);
  }

  async areInMatch(createMatchDto: CreateMatchInput): Promise<MatchDocument> {
    const { firstUserId, secondUserId } =
      this.setNormalizeOrder(createMatchDto);

    return await this.matchModel.findOne({
      $and: [{ firstUserId: firstUserId }, { secondUserId: secondUserId }],
    });
  }
  async getAllMatchSuggestion(userId: string): Promise<MatchDocument[]> {
    return await this.matchModel.find({
      $and: [
        {
          secondUserId: new mongoose.Types.ObjectId(userId),
        },
        {
          isAccepted: false,
        },
      ],
    });
  }

  haveYouOfferedMatch(matchId: string, userId: string) {
    console.log(matchId);

    return this.matchModel.findOne({
      $and: [
        {
          _id: new mongoose.Types.ObjectId(matchId),
        },

        {
          secondUserId: new mongoose.Types.ObjectId(userId),
        },
      ],
    });
  }

  async updateMatchState(userId: string, updateMatch: UpdateMatchInput) {
    const match = await this.haveYouOfferedMatch(updateMatch.id, userId);

    console.log(match);

    if (!match)
      throw new ForbiddenException("you haven't offered by this match");

    if (updateMatch.state === "accept") {
      return await this.acceptMatch(updateMatch.id);
    }

    if (updateMatch.state === "reject") {
      return await this.rejectMatch(updateMatch.id);
    }
  }

  async rejectMatch(id: string): Promise<MatchDocument> {
    return await this.matchModel.findOneAndDelete({
      _id: new mongoose.Types.ObjectId(id),
    });
  }

  async acceptMatch(id: string): Promise<MatchDocument> {
    return await this.matchModel.findOneAndUpdate(
      { _id: new mongoose.Types.ObjectId(id) },
      {
        $set: { isAccepted: true },
      }
    );
  }

  async findOneOrThrowError(id: string): Promise<MatchDocument> {
    const match = await this.matchModel.findById(id);

    if (!match)
      throw new BadRequestException(
        "the match with provided credentials doesn't exist"
      );

    return match;
  }

  async remove(id: string): Promise<MatchDocument> {
    return await this.matchModel.findOneAndDelete({
      _id: new mongoose.Types.ObjectId(id),
    });
  }

  setNormalizeOrder(createMatchInput: CreateMatchInput): NormalizedMatchInput {
    let firstUserId = new mongoose.Types.ObjectId(createMatchInput.firstUser);
    let secondUserId = new mongoose.Types.ObjectId(createMatchInput.secondUser);

    if (firstUserId.toHexString() > secondUserId.toHexString()) {
      let temp = firstUserId;
      firstUserId = secondUserId;
      secondUserId = temp;
    }

    return { firstUserId, secondUserId };
  }

  async isUserInMatch(matchId: string, userId: string): Promise<boolean> {
    const match = await this.findOneOrThrowError(matchId);

    const isFirstUser = match.firstUserId.toString() === userId ? true : false;
    const isSecondUser =
      match.secondUserId.toString() === userId ? true : false;

    return isFirstUser || isSecondUser ? true : false;
  }
}
