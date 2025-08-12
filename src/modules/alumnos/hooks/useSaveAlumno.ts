import { useMutation, useQueryClient } from "@tanstack/react-query";
import { saveAlumno } from "../services/alumnos.service";

export const useSaveAlumno = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ data, id }: { data: any; id?: string }) =>
      saveAlumno(data, id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["alumnos"] });
    },
  });
};
