import { supabase } from "@/lib/supabase";

export async function getDetalleCatalogo(catalogo: string) {
  const { data, error } = await supabase
    .from("catalogo_detalles")
    .select("id, nombre,catalogos!inner()")
    .eq("catalogos.codigo", catalogo);

  if (error) throw error;
  return data;
}
