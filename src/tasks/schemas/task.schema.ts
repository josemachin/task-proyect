import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, Types } from 'mongoose';
import { ObjectType, Field, ID } from '@nestjs/graphql';

@Schema({ timestamps: true })
@ObjectType() // Decorador para definir el tipo de objeto GraphQL
export class Task extends Document {

  @Prop({ required: true })
  @Field() // Define un campo GraphQL para el path
  status: string;

  @Prop({ required: true })
  @Field() // Define un campo GraphQL para la resolución
  price: string;

  @Prop({ required: true })
  @Field() // Define un campo GraphQL para el md5
  originalPath: string;

  // Referencia a la task asociada
  images: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Image' }]
}

export const TaskSchema = SchemaFactory.createForClass(Task);