import { SemesterSchema } from "@/features/semester/schemas/semester.schema";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { z } from "zod";
import { axios } from "../../axios";
import { fetchTeacherPath } from "./fetchApi";
import { Course } from "./type";

type Create = z.infer<typeof SemesterSchema.createDTO>;

const createTeacher = async (
  data: Omit<Create, "id">
): Promise<{ data: Course } | undefined> => {
  return axios.post("/course", data);
};

export const useCourseMutation = () => {
  const queryClient = useQueryClient();
  return useMutation<{ data: Course } | undefined, Error, Create>({
    mutationFn: createTeacher,
    onSuccess: (res: { data: Course } | undefined) => {
      queryClient.invalidateQueries({ queryKey: [fetchTeacherPath] });
    },
  });
};
