import { ObjectType, Field, Int } from "@nestjs/graphql";

@ObjectType()
export class AuthPayload {
  @Field()
  token: string;

  @Field()
  name: string;
}
