import { Resolver, Query, Mutation, Args, Int } from "@nestjs/graphql";
import { MatchService } from "./match.service";
import { Match } from "./entities/match.entity";
import { CreateMatchInput } from "./dto/create-match.input";
import { UpdateMatchInput } from "./dto/update-match.input";
import { UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/guards/jwt.auth.guard";
import { GetCurrentUserId } from "src/decorators/get.courent.userId";
import mongoose from "mongoose";

@Resolver(() => Match)
export class MatchResolver {
  constructor(private readonly matchService: MatchService) {}

  @UseGuards(JwtAuthGuard)
  @Mutation(() => Match, { name: "createMatch" })
  createMatch(
    @Args("createMatchInput") createMatchInput: CreateMatchInput,

    @GetCurrentUserId() userId: string
  ) {
    return this.matchService.create({
      firstUser: userId,
      secondUser: createMatchInput.secondUser,
    });
  }

  @UseGuards(JwtAuthGuard)
  @Query(() => [Match], { name: "getAllSuggestedMatches" })
  findAll(@GetCurrentUserId() userId: string) {
    userId = "64b4f2057e7faf243e8c19bd";
    return this.matchService.getAllMatchSuggestion(userId);
  }

  @Query(() => Match, { name: "match" })
  findOne(@Args("id") id: string) {
    return this.matchService.findOneOrThrowError(id);
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => Match, { name: "changeStateOfMatch" })
  updateState(
    @Args("updateMatch") updateMatch: UpdateMatchInput,
    @GetCurrentUserId() userId: string
  ) {
    return this.matchService.updateMatchState(userId, updateMatch);
  }

  @Mutation(() => Match)
  removeMatch(@Args("id") id: string) {
    return this.matchService.remove(id);
  }
}
