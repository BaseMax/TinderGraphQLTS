import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema()
class User {
  @Prop({ unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true })
  name: string;

  @Prop({ type: [{ type: String }] })
  interests: string[];

  @Prop()
  location: string;

  @Prop()
  age: number;

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
