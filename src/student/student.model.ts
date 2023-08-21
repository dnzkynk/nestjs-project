import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Student, StudentSchema } from '../student/student.schema';
import { StudentsResolver } from './student.resolver';
import { StudentService } from './student.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Student.name, schema: StudentSchema }]),
  ],
  providers: [StudentsResolver, StudentService],
})
export class StudentsModule {}
