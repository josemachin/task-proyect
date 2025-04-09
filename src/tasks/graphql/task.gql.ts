import { Field, ObjectType, ID } from '@nestjs/graphql';

@ObjectType()
export class Image {
  @Field(() => String)
  path: string;

  @Field(() => String)
  resolution: string;

  @Field(() => String)
  md5: string;
}

@ObjectType()
export class Task {
  @Field(() => ID)
  id: string;

  @Field(() => String)
  status: string;

  @Field(() => Number)
  price: number;

  @Field(() => [Image])
  images: [Image];

  @Field(() => String)
  originalPath: string;
}
