"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SemesterSchema } from "@/features/semester/schemas/semester.schema";
import { toast } from "@/hooks/use-toast";
import { useCreate } from "@/lib/api/semesterApi";
import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError } from "axios";
import { Save } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

export type ZodError = {
  code: string;
  message: string;
  fatal: boolean;
  path: string[];
};

type SemesterFormData = z.infer<typeof SemesterSchema.createDTO>;

const SemesterAddForm = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    setError,
    reset,
  } = useForm<SemesterFormData>({
    resolver: zodResolver(SemesterSchema.createDTO),
  });

  const { mutateAsync: create, isError, error, isSuccess, data } = useCreate();

  const onSubmit = async (data: SemesterFormData) => {
    await create({
      ...data,
      maxCourses: parseInt(data.maxCourses) as any,
      maxStudents: parseInt(data.maxStudents) as any,
    });
  };

  const handleTypeChange = (value: string) => {
    setValue("type", value as SemesterFormData["type"]);
  };

  useEffect(() => {
    if (isSuccess) {
      reset();
      router.push("/semester");
      toast({
        title: "Semester Created",
        description: `${data?.data.name} has been added`,
      });
    }
  }, [isSuccess]);

  useEffect(() => {
    if (isError) {
      if (error instanceof AxiosError) {
        const errs: ZodError[] = error.response?.data;
        errs.forEach((item) => {
          item.path.forEach((field: any) => {
            setError(field, { message: item.message });
          });
        });
      }
    }
  }, [error, isError]);

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="name">Course Name</Label>
            <Input
              id="name"
              placeholder="Semester [number]"
              {...register("name", {
                required: "Course name is required",
              })}
              className={errors.name ? "border-destructive" : ""}
            />
            {errors.name && (
              <p className="text-sm text-destructive">{errors.name.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="semester">Type</Label>
            <Select onValueChange={handleTypeChange} defaultValue="ACADEMIC">
              <SelectTrigger
                id="type"
                className={errors.type ? "border-destructive" : ""}
              >
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ACADEMIC">Academic</SelectItem>
                <SelectItem value="NONACADEMIC">Nonacademic</SelectItem>
              </SelectContent>
            </Select>
            {errors.type && (
              <p className="text-sm text-destructive">{errors.type.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="maxStudents">Max Students</Label>
            <Input
              id="maxStudents"
              type="number"
              placeholder="60"
              {...register("maxStudents")}
              className={errors.maxStudents ? "border-destructive" : ""}
            />
            {errors.maxStudents && (
              <p className="text-sm text-destructive">
                {errors.maxStudents.message}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="maxCourses">Max Courses</Label>
            <Input
              id="maxCourses"
              type="number"
              placeholder="60"
              {...register("maxCourses")}
              className={errors.maxCourses ? "border-destructive" : ""}
            />
            {errors.maxCourses && (
              <p className="text-sm text-destructive">
                {errors.maxCourses.message}
              </p>
            )}
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-4">
          <Button
            type="button"
            variant="outline"
            // onClick={() => navigate("/courses")}
          >
            Cancel
          </Button>
          <Button type="submit" className="gap-2">
            <Save size={16} /> Save Semester
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SemesterAddForm;
