import { JsonController, Param, Body, Get, Post, Delete, UseBefore, Res } from 'routing-controllers';
import { StudentProgramme } from '../model/models';
import { Response } from 'express';
import { getRepository, Repository, Like, FindManyOptions } from 'typeorm';
import { JwtMiddleware } from '../middleware/jwt.middleware';

@JsonController('/studentProgrammes')
@UseBefore(JwtMiddleware)
export class StudentProgrammeController {

  private service = getRepository(StudentProgramme);

  @UseBefore(JwtMiddleware)
  @Get('/getFollowed/:startIndex/:pageSize/:idStudent/:filter')
  async getFollowed(@Param('startIndex') startIndex, @Param('pageSize')
  pageSize, @Param('idStudent') idStudent, @Param('filter') filter: string, @Res() response: Response) {

    const studentId = response.locals.jwtPayload.studentId as number;

    const p2 = await this.service.createQueryBuilder('p')
      .where("p.studentId = :id", { id: idStudent })
      .leftJoinAndSelect("p.programme", "programme", "programme.title like :filter", { filter: `%${filter === '*' ? '' : filter}%` })
      .skip(startIndex)
      .take(pageSize)
      .leftJoinAndSelect("programme.student", "student")
      .getManyAndCount();

    return p2;

  }

  @Post('/post')
  async post(@Body() model: StudentProgramme) {
    try {
      return await this.service.save(model);
    } catch (error) {
      return model;
    }
  }

  @Delete('/delete/:idStudent/:idProgramme')
  async delete(@Param('idStudent') idStudent: number, @Param('idProgramme') idProgramme: number) {

    return await this.service.createQueryBuilder()
      .delete()
      .where("studentId = :idStudent and programmeId = :idProgramme", { idStudent, idProgramme })
      .execute()
      ;
  }
}
