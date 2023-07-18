import { Document } from "mongoose";

export interface MatchDocument extends Document {
  readonly firstUserId: string;
  readonly secondUserId: string;
  readonly createdAt: Date;
}
