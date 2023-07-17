import { Resolver, Query, Mutation, Args, Int } from "@nestjs/graphql";
import { UserService } from "./user.service";
import { User } from "./entities/user.entity";
import { UpdateUserInput } from "./dto/update-user.input";
import { UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/guards/jwt.auth.guard";
import { GetCurrentUserId } from "src/decorators/get.courent.userId";
import { SearchInput } from "./dto/search.user.dto";

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => User, { name: "user" })
  findOne(@Args("id", { type: () => Int }) id: number) {
    return this.userService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => User)
  updateUser(
    @Args("updateUserInput") updateUserInput: UpdateUserInput,
    @GetCurrentUserId() userId: string
  ) {
    return this.userService.update(userId, updateUserInput);
  }

  @Query(() => [User], { name: "findAllUserProfiles" })
  getAllUserProfiles() {
    return this.userService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => User)
  removeUser(@GetCurrentUserId() userId: string) {
    return this.userService.remove(userId);
  }

  @Query(() => [User], { name: "searchUser" })
  searchUser(@Args("searchUser") searchDto: SearchInput) {
    console.log("here");

    return this.userService.searchUser(searchDto);
  }
}
