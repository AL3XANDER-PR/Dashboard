import { useQuery } from "@tanstack/react-query";
import { getAlumnos } from "../services/alumnos.service";

export const useAlumnos = (/* page: number, pageSize: number */) => {
  return useQuery({
    queryKey: ["alumnos"],
    queryFn: getAlumnos,
    // keepPreviousData: true,
  });
};
