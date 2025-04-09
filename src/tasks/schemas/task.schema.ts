// tasks/schemas/task.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class Task extends Document {
  @Prop({ required: true })
  status: string;

  @Prop({ required: true, default: 0 })
  price: number;

  @Prop({ required: true })
  originalPath: string;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Image' }], default: [] })
  images: Types.Array<Types.ObjectId>;

  @Prop({ type: Date, index: true })
  createdAt: Date;

  @Prop({ type: Date })
  updatedAt: Date;
}
export const TaskSchema = SchemaFactory.createForClass(Task);



