import { SignupInput } from "./signup.dto";
import { InputType, Field, Int, PartialType, OmitType } from "@nestjs/graphql";

@InputType()
export class LoginInput extends OmitType(SignupInput, ["name"] as const) {
}
