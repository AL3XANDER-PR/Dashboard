import { useQuery } from "@tanstack/react-query";
import { getAlumnos } from "../services/alumnos.service";

export const useAlumnos = (/* page: number, pageSize: number */) => {
  return useQuery({
    queryKey: ["alumnos"],
    queryFn: getAlumnos,
    staleTime: 1000 * 60 * 5, // cache 5 minutos
    gcTime: 1000 * 60 * 10,
    // refetchOnWindowFocus: "always",
    retry: 1,
  });
};
