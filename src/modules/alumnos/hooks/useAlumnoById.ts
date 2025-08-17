import { useQuery } from "@tanstack/react-query";
import { getAlumnoById } from "../services/alumnos.service";

export const useAlumnoById = (id?: string) => {
  return useQuery({
    queryKey: ["alumno", id],
    queryFn: async () => getAlumnoById(id!),
    enabled: !!id, // solo ejecuta si existe id
    staleTime: 1000 * 60 * 5, // cache 5 minutos
    gcTime: 1000 * 60 * 10,
    // refetchOnWindowFocus: "always",
  });
};
