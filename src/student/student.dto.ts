import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class StudentDTO {
  @Field()
  name: string;

  @Field()
  lastname: string;

  @Field(() => [String])
  lesson: string[];
}
