import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Student } from './student.schema';
import { StudentDTO } from './student.dto';

@Injectable()
export class StudentService {
  constructor(
    @InjectModel(Student.name) private studentModel: Model<Student>,
  ) {}

  async createStudent(studentData: StudentDTO): Promise<Student> {
    const student = new this.studentModel(studentData);
    return student.save();
  }

  async addLessonToStudent(id: string, lesson: string): Promise<Student> {
    const student = await this.studentModel.findById(id);

    if (student) {
      if (!student.lesson.includes(lesson)) {
        student.lesson.push(lesson);
        await student.save();
      }
    }

    return student;
  }
  async deleteAllStudents(): Promise<void> {
    await this.studentModel.deleteMany({});
  }
  async deleteStudent(id: string): Promise<void> {
    try {
      return await this.studentModel.findByIdAndDelete(id);
    } catch (error) {
      console.error(error);
    }
  }
  async deleteAllLessonsFromStudent(id: string): Promise<boolean> {
    try {
      const student = await this.studentModel.findById(id).exec();
      student.lesson = [];
      await student.save();
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }
}
