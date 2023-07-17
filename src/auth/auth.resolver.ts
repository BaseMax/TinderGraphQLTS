import { Resolver, Query, Mutation, Args, Int } from "@nestjs/graphql";
import { AuthService } from "./auth.service";
import { AuthPayload } from "./entities/auth.entity";
import { SignupInput } from "./dto/signup.dto";
import { LoginInput } from "./dto/login.dto";
import { UseFilters } from "@nestjs/common";



@Resolver(() => AuthPayload)
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => AuthPayload)
  signup(@Args("signupInput") signupInput: SignupInput) {
    return this.authService.signup(signupInput);
  }

  @Mutation(() => AuthPayload, {name :"login"})
  login(@Args("loginInput") loginInput: LoginInput) {
    return this.authService.login(loginInput);
  }
}
