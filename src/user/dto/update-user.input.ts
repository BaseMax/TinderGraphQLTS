import { SignupInput } from "src/auth/dto/signup.dto";
import { InputType, Field, Int, PartialType, OmitType } from "@nestjs/graphql";
import {
  ArrayMinSize,
  IsArray,
  IsNumber,
  IsString,
  MaxLength,
  Min,
  ValidateIf,
} from "class-validator";

@InputType()
export class UpdateUserInput {
  @Field({ nullable: true })
  @IsString()
  @ValidateIf((object, value) => value !== undefined)
  password: string;

  @Field({ nullable: true })
  @IsString()
  @ValidateIf((object, value) => value !== undefined)
  name: string;

  @Field(() => [String], { nullable: true })
  @IsArray()
  @ArrayMinSize(1, { message: "At least one value is required" })
  @IsString({ each: true, message: "all values must be string" })
  @ValidateIf((object, value) => value !== undefined)
  interests: string[];

  @Field({ nullable: true })
  @IsString()
  @ValidateIf((object, value) => value !== undefined)
  location: string;

  @Field(() => Int, { nullable: true })
  @IsNumber()
  @Min(20, {
    message: "you must at least be 20 years old, come some years later",
  })
  @MaxLength(40, { message: "perhaps this platform wont be suitable for you." })
  @ValidateIf((object, value) => value !== undefined)
  age: number;
}
