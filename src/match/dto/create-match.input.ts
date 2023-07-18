import { InputType, Int, Field } from "@nestjs/graphql";
import { Prop, Schema } from "@nestjs/mongoose";
import mongoose from "mongoose";

@InputType()
export class CreateMatchInput {
  firstUser: string;

  @Field()
  secondUser: string;
}

export class NormalizedMatchInput {
  firstUserId: mongoose.Types.ObjectId;
  secondUserId: mongoose.Types.ObjectId;
}
