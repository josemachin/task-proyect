// tasks/schemas/image.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';



@Schema({ timestamps: true })
export class Image extends Document {
  @Prop({ required: true })
  path: string;

  @Prop({ required: true })
  resolution: string;

  @Prop({ required: true })
  md5: string;

  // Referencia a la task asociada
  @Prop({ type: Types.ObjectId, ref: 'Task', index: true })
  task: Types.ObjectId;
}

export const ImageSchema = SchemaFactory.createForClass(Image);