"use client";

import CustomForm from "@/components/custom/form/CustomForm";
import { CourseSchema } from "@/features/course/schemas/course.schema";
import { toast } from "@/hooks/use-toast";
import { useCourseMutation } from "@/lib/api/coureseApi";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { z } from "zod";

type CourseFormData = z.infer<typeof CourseSchema.createDTO>;

const CourseAddForm = () => {
  const router = useRouter();

  const {
    mutateAsync: create,
    isError,
    error,
    isSuccess,
    data,
  } = useCourseMutation();

  const onSubmit = async (data: CourseFormData) => {
    console.log(data);
    await create(data as any);
  };

  useEffect(() => {
    if (isSuccess) {
      router.push("/courses");
      toast({
        title: "Semester Created",
        description: `${data?.data.name} has been added`,
      });
    }
  }, [isSuccess]);

  return (
    <div>
      <CustomForm
        schema={CourseSchema.createDTO}
        shouldReset={false}
        onSubmit={onSubmit}
        isError={isError}
        error={error}
        cancelHandler={() => {}}
        inputFields={[
          {
            type: "input",
            label: "Course Name",
            name: "name",
            value: "",
          },
          {
            type: "input",
            label: "Course Code",
            name: "code",
            value: "",
          },
          {
            type: "select",
            label: "Course Type",
            name: "type",
            values: [
              {
                label: "Elective",
                value: "ELECTIVE",
              },
              {
                label: "Required",
                value: "REQUIRED",
              },
            ],
          },
          {
            type: "input",
            label: "Credits",
            name: "credits",
            value: "",
            attributes: {
              type: "number",
            },
          },
          {
            type: "textarea",
            label: "Descriptions",
            name: "descriptions",
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

export default CourseAddForm;
