import { InputType, Field, ID } from '@nestjs/graphql';

@InputType()
export class CreateImageInput {
  @Field()
  path: string;

  @Field()
  resolution: string;

  @Field()
  md5: string;

  @Field(type => ID, { nullable: true })
  task?: string;
}
