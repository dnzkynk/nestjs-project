import { Resolver, Query, ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
class Cat {
  @Field()
  name: string;
  @Field()
  family: string;
  @Field({ nullable: true })
  age?: number;
}

@Resolver()
export class AppResolver {
  @Query(() => Cat, { name: 'cats' })
  hello() {
    return { name: 'gijok', family: 'default' };
  }
  @Query(() => String)
  title() {
    return 'GraphQL NestJS Example';
  }
}
