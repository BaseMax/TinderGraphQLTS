import { CreateMatchInput } from "./create-match.input";
import {
  InputType,
  Field,
  Int,
  PartialType,
  registerEnumType,
} from "@nestjs/graphql";

@InputType()
export class UpdateMatchInput {
  @Field(() => String)
  id: string;

  @Field((type) => String)
  state: string;
}
