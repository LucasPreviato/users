import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IUser } from '../models/user.interface';

export type UserDocument = User & Document;

@Schema()
export class User {
  constructor(props: IUser) {
    Object.assign(this, props);
  }
  @Prop({ required: true })
  coreId: number;
  @Prop({ required: true })
  techId: number;
  @Prop({ required: true })
  name: string;
  @Prop({ required: true, unique: true })
  email: string;
  @Prop({ required: true })
  password: string;
  @Prop({ required: true, default: Date.now, type: Date, immutable: true })
  created_at?: Date;
  @Prop({ required: true, default: Date.now, type: Date })
  updated_at?: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
