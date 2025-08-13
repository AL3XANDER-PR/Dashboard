import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createAlumno, updateAlumno } from "../services/alumnos.service";
import type { Alumno } from "../pages/AlumnosPage";

export const useSaveAlumno = (id?: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: Alumno) =>
      id ? updateAlumno(id, data) : createAlumno(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["alumnos"] });
    },
  });
};
