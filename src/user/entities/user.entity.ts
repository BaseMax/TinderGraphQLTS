import { ObjectType, Field, Int } from "@nestjs/graphql";

@ObjectType()
export class User {
  @Field()
  name: string;

  @Field(() => [String])
  interests: string[];

  @Field(() => Int, { nullable: true })
  age: number;
}
