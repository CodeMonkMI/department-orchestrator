"use client";
import { useQuery } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { axios } from "../../axios";
import { Semester } from "./type";

export const fetchPath = "/semester";

const fetchSemester = async (): Promise<Semester[] | undefined> => {
  const data: AxiosResponse = await axios.get(fetchPath);
  return data.data;
};

export const useSemesterQuery = () =>
  useQuery({
    queryKey: [fetchPath],
    queryFn: fetchSemester,
  });
