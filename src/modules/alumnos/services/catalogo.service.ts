import { supabase } from "@/lib/supabase";

export async function getDetalleCatalogo(catalogo: string) {
  const { data, error } = await supabase
    .from("catalogo_detalles")
    .select("id, nombre")
    .eq("catalogos.codigo", catalogo);

  console.log(data);

  if (error) throw error;
  return data;
}
