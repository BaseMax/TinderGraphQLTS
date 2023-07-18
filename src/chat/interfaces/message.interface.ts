import { Document } from "mongoose";

export interface MessageDocument extends Document {
  readonly senderId: string;
  readonly content: string;
  readonly createdAt: Date;
}
