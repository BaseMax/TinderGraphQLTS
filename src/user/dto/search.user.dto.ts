import { Field, InputType } from "@nestjs/graphql";
import { ArrayMinSize, IsNumber, IsString, ValidateIf } from "class-validator";

@InputType()
export class SearchInput {
  @Field({ nullable: true })
  @IsString()
  location: string;

  @Field(() => [String], { nullable: true })
  @ArrayMinSize(0)
  @ValidateIf((object, value) => value !== undefined)
  interests: string[];

  @Field({ nullable: true })
  @IsNumber()
  @ValidateIf((object, value) => value !== undefined)
  age: number;
}
