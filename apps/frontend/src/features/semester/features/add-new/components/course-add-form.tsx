"use client";

import CustomForm from "@/components/custom/form/CustomForm";
import { SemesterSchema } from "@/features/semester/schemas/semester.schema";
import { toast } from "@/hooks/use-toast";
import { useCreate } from "@/lib/api/semesterApi";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { z } from "zod";

type SemesterFormData = z.infer<typeof SemesterSchema.createDTO>;

const SemesterAddForm = () => {
  const router = useRouter();

  const { mutateAsync: create, isError, error, isSuccess, data } = useCreate();

  const onSubmit = async (data: SemesterFormData) => {
    await create({
      ...data,
      maxCourses: parseInt(data.maxCourses) as any,
      maxStudents: parseInt(data.maxStudents) as any,
    });
  };

  useEffect(() => {
    if (isSuccess) {
      router.push("/semester");
      toast({
        title: "Semester Created",
        description: `${data?.data.name} has been added`,
      });
    }
  }, [isSuccess]);

  return (
    <div>
      <CustomForm
        schema={SemesterSchema.createDTO}
        shouldReset={true}
        onSubmit={onSubmit}
        isError={isError}
        cancelHandler={() => {}}
        error={error}
        inputFields={[
          {
            type: "input",
            label: "Semester Name",
            name: "name",
            value: "",
          },
          {
            type: "select",
            label: "Type",
            name: "type",
            values: [
              {
                label: "Academic",
                value: "ACADEMIC",
              },
              {
                label: "Nonacademic",
                value: "NONACADEMIC",
              },
            ],
          },
          {
            type: "input",
            label: "Max Students",
            name: "maxStudents",
            value: "",
            attributes: {
              type: "number",
            },
          },
          {
            type: "input",
            label: "Max Courses",
            name: "maxCourses",
            value: "",
            attributes: {
              type: "number",
            },
          },
        ]}
      />
    </div>
  );
};

export default SemesterAddForm;
