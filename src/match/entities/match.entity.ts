import { ObjectType, Field, Int } from "@nestjs/graphql";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";

@ObjectType()
@Schema()
export class Match {
  @Field()
  _id: string;

  @Field()
  @Prop({
    type: mongoose.Schema.ObjectId,
    ref: "users",
    required: true,
  })
  firstUserId: string;

  @Field()
  @Prop({
    type: mongoose.Schema.ObjectId,
    ref: "users",
    required: true,
  })
  secondUserId: string;

  @Field()
  @Prop({ type: Boolean, default: false })
  isAccepted: boolean;

  @Field()
  @Prop({ default: new Date() })
  createdAt: Date;
}

export const MatchSchema = SchemaFactory.createForClass(Match);

MatchSchema.index({ firstUserId: 1, secondUserId: 1 }, { unique: true });
