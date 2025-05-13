import { SemesterSchema } from "@/features/semester/schemas/semester.schema";
import { useMutation } from "@tanstack/react-query";
import { z } from "zod";
import { axios } from "../../axios";
import { Semester } from "./type";

export const authApiPath = {
  login: "/auth/login",
};

type Create = z.infer<typeof SemesterSchema.createDTO>;

const createSemester = async (
  data: Create
): Promise<{ data: Semester } | undefined> => {
  return axios.post("/semester", data);
};

export const useCreate = () =>
  useMutation<{ data: Semester } | undefined, Error, Create>({
    mutationFn: createSemester,
    onSuccess: (res: { data: Semester } | undefined) => {
      if (res?.data) {
      }
    },
  });
