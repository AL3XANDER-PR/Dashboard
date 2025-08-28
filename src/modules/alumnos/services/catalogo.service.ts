// import { supabase } from "@/lib/supabase";

export async function getDetalleCatalogo(catalogo: string) {
  // const { data: datasu, error: errosub } = await supabase.auth.refreshSession();
  // console.log(`💻 - getAlumnoById - ♻️ Manual refresh::`, { datasu, errosub });

  // const { data, error } = await supabase
  //   .from("catalogo_detalles")
  //   .select("id, nombre,catalogos!inner()")
  //   .eq("catalogos.codigo", catalogo);

  // if (error) throw error;
  // return data;

  try {
    const response = await fetch(
      `http://localhost:3000/api/v1/catalogos/${catalogo}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return response.json();
  } catch (error) {
    console.error("Error al traer usuarios:", error);
    throw error;
  }
}
