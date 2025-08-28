import { useQuery } from "@tanstack/react-query";
import { getDetalleCatalogo } from "../services/catalogo.service";

export const useDetalleCatalogo = (catalogo: string) => {
  return useQuery({
    queryKey: ["detalleCatalogo", catalogo],
    queryFn: () => getDetalleCatalogo(catalogo),
    enabled: !!catalogo, // no consulta si es undefined/null
    staleTime: 1000 * 60 * 5, // cache 5 minutos
    gcTime: 1000 * 60 * 10,
    // refetchOnWindowFocus: "always",
    retry: 1,
  });
};
