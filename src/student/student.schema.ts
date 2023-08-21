import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type UserDocument = Student & Document;

@Schema()
@ObjectType()
export class Student {
  @Prop()
  @Field()
  name: string;

  @Prop()
  @Field()
  lastname: string;

  @Prop()
  @Field(() => [String])
  lesson: string[];
}

export const StudentSchema = SchemaFactory.createForClass(Student);
