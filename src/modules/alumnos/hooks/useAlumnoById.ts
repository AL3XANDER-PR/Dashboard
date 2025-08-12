import { useQuery } from "@tanstack/react-query";
import { getAlumnoById } from "../services/alumnos.service";

export const useAlumnoById = (id?: string) => {
  return useQuery({
    queryKey: ["alumno", id],
    queryFn: () => getAlumnoById(id!),
    enabled: !!id, // solo ejecuta si existe id
  });
};
