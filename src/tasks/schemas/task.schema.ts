import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, Types } from 'mongoose';
import { ObjectType, Field, ID } from '@nestjs/graphql';

@Schema({ timestamps: true })
@ObjectType() 
export class Task extends Document {

  @Prop({ required: true })
  @Field() 
  status: string;

  @Prop({ required: true })
  @Field() 
  price: string;

  @Prop({ required: true })
  @Field() 
  originalPath: string;
  images: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Image' }]
}

export const TaskSchema = SchemaFactory.createForClass(Task);