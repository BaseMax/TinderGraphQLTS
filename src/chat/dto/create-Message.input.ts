import { InputType, Int, Field } from "@nestjs/graphql";
import { IsString } from "class-validator";

@InputType()
export class CreateMessageInput {
  @Field()
  @IsString()
  matchId: string;

  @Field()
  @IsString()
  content: string;
}
