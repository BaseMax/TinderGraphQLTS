import { InputType, Int, Field } from "@nestjs/graphql";
import { Prop, Schema } from "@nestjs/mongoose";
import { IsEmail, IsString } from "class-validator";

@InputType()
export class SignupInput {
  @Field()
  @IsEmail()
  email: string;

  @Field()
  @IsString()
  password: string;

  @Field()
  @IsString()
  name: string;
}
