import { BaseSelector } from "@/lib/core/selector/BaseSelector";
import { Prisma } from "@prisma/client";
import { singleton } from "tsyringe";

@singleton()
export class CourseOfferingSelector extends BaseSelector<Prisma.CourseOfferingDelegate> {
  public getBase(): Prisma.Args<
    Prisma.CourseOfferingDelegate,
    "findMany"
  >["select"] {
    return {
      id: true,
      status: true,
      semester: {
        select: {
          name: true,
          type: true,
        },
      },
      course: {
        select: {
          code: true,
          name: true,
          type: true,
          credits: true,
          description: true,
        },
      },
      courseAssignment: {
        select: {
          teacher: {
            select: {
              title: true,
              user: {
                select: {
                  fullname: true,
                },
              },
            },
          },
        },
      },
    };
  }
}
