import { BaseService } from "@/lib/core/service/BaseService";
import { StudentRepository } from "@/repository/student.repository";
import { StudentSelector } from "@/selectors/student.selector";
import { Prisma } from "@prisma/client";
import { autoInjectable } from "tsyringe";
import { UserService } from "./user.service";

type StudentDelegate = Prisma.StudentDelegate;

@autoInjectable()
export class StudentService extends BaseService<StudentDelegate> {
  constructor(
    protected repository: StudentRepository,
    protected selector: StudentSelector,
    protected userService: UserService
  ) {
    super(repository, selector);
  }

  async create(
    data: Prisma.Args<StudentDelegate, "create">["data"]
  ): Promise<
    Prisma.Result<
      StudentDelegate,
      { data: Prisma.Args<StudentDelegate, "create">["data"] },
      "create"
    >
  > {
    try {
      const user = await this.userService.findByID(data.userId!!);
      if (!user) {
        throw this.generateError("Invalid user", 400);
      }
      return this.repository.create(
        data,
        this.selector.create as Prisma.StudentSelect
      );
    } catch (error) {
      if (error && (error as any)?.statusCode) {
        throw error;
      }
      throw new Error(`[Student service] Create - failed `);
    }
  }
}

export const StudentServiceToken = Symbol("StudentServiceToken");
