import { Document } from "mongoose";

export interface User extends Document {
  uid: string;
  points: number;
}