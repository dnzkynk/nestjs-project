import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { Student } from '../student/student.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { StudentDTO } from './student.dto';
import { StudentService } from './student.service';

@Resolver(() => Student)
export class StudentsResolver {
  constructor(
    @InjectModel(Student.name) private studentModel: Model<Student>,
    private studentService: StudentService,
  ) {}

  @Query(() => [Student])
  async studentsList(): Promise<Student[]> {
    return this.studentModel.find().exec();
  }

  @Query(() => [String]) // Örnek sorgu tanımı
  async studentLessons(
    @Args('studentId') studentId: string,
  ): Promise<string[]> {
    const student = await this.studentModel.findById(studentId).exec();
    return student.lesson;
  }
  @Mutation(() => Student)
  async createStudent(@Args('input') input: StudentDTO): Promise<Student> {
    return this.studentService.createStudent(input);
  }

  @Mutation(() => Student)
  async addLessonToStudent(
    @Args('id') id: string,
    @Args('lesson') lesson: string,
  ): Promise<Student> {
    return this.studentService.addLessonToStudent(id, lesson);
  }
  @Mutation(() => Boolean)
  async deleteAllStudents(): Promise<boolean> {
    try {
      await this.studentService.deleteAllStudents();
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }
  @Mutation(() => Boolean)
  async deleteStudent(@Args('id') id: string): Promise<void> {
    return this.studentService.deleteStudent(id);
  }
  @Mutation(() => Boolean)
  async deleteAllLessonsFromStudent(@Args('id') id: string): Promise<boolean> {
    return this.studentService.deleteAllLessonsFromStudent(id);
  }
}
