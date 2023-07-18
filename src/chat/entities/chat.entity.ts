import { ObjectType, Field, Int } from "@nestjs/graphql";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";

@ObjectType()
@Schema()
export class Message {
  @Field()
  _id: string;

  @Field()
  @Prop({
    type: mongoose.Schema.ObjectId,
    ref: "users",
    required: true,
  })
  matchId: string;


  
  @Field()
  @Prop({
    type: mongoose.Schema.ObjectId,
    ref: "users",
    required: true,
  })
  senderId: string;

  @Field()
  @Prop()
  content: string;

  @Field()
  @Prop({
    type: Date,
    default: new Date(),
  })
  createdAt: Date;
}

export const MessageSchema = SchemaFactory.createForClass(Message);
