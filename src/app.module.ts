import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';

import { join } from 'path';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { AppResolver } from './app.resolver';
import { AppService } from './app.service';
import { Student } from './student/student.schema';
import { StudentsModule } from './student/student.model';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27018/graphql'),
    GraphQLModule.forRoot({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      playground: false,
      plugins: [ApolloServerPluginLandingPageLocalDefault()],
    }),
    StudentsModule,
  ],
  providers: [AppResolver, AppService],
})
export class AppModule {}
