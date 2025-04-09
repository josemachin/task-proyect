import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { ObjectType, Field, ID } from '@nestjs/graphql';

@Schema({ timestamps: true })
@ObjectType() // Decorador para definir el tipo de objeto GraphQL
export class Image extends Document {
  @Field(type => ID) // Define el campo como un ID en GraphQL
  _id: string;

  @Prop({ required: true })
  @Field() // Define un campo GraphQL para el path
  path: string;

  @Prop({ required: true })
  @Field() // Define un campo GraphQL para la resolución
  resolution: string;

  @Prop({ required: true })
  @Field() // Define un campo GraphQL para el md5
  md5: string;

  // Referencia a la task asociada
  @Prop({ type: Types.ObjectId, ref: 'Task', index: true })
  @Field(type => ID, { nullable: true }) // Define el campo como un ID en GraphQL, puede ser nulo
  task: Types.ObjectId;
}

export const ImageSchema = SchemaFactory.createForClass(Image);
