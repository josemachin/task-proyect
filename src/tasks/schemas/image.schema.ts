import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { ObjectType, Field, ID } from '@nestjs/graphql';

@Schema({ timestamps: true })
@ObjectType() 
export class Image extends Document {
  @Field(type => ID) L
  _id: string;

  @Prop({ required: true })
  @Field() 
  path: string;

  @Prop({ required: true })
  @Field() 
  resolution: string;

  @Prop({ required: true })
  @Field() 
  md5: string;

  @Prop({ type: Types.ObjectId, ref: 'Task', index: true })
  @Field(type => ID, )
  task: Types.ObjectId;
}

export const ImageSchema = SchemaFactory.createForClass(Image);
