import { CreateMessageInput } from "./create-Message.input";
import { InputType, Field, Int, PartialType } from "@nestjs/graphql";

@InputType()
export class UpdateChatInput extends PartialType(CreateMessageInput) {
  @Field(() => Int)
  id: number;
}
