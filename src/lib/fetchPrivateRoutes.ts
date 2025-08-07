// src/lib/fetchPrivateRoutes.ts
import type { DBRoute } from "@/app/router/types";
import { supabase } from "@/lib/supabase";

export async function fetchPrivateRoutes(): Promise<DBRoute[]> {
  try {
    // console.log("🚀 Llamando a Supabase o backend...");
    const { data, error } = await supabase
      .from("routes")
      .select("*")
      .eq("guard", "private")
      .eq("active", true);
    // console.log("💻 - fetchPrivateRoutes - data:", data);

    // if (!data) throw new Error("Error en fetch de rutas");
    if (error) {
      console.error("❌ Error al obtener rutas privadas:", error);
      throw error;
    }
    return data; // o lo que corresponda
  } catch (err) {
    console.error("❌ Error en fetchPrivateRoutes:", err);
    return []; // o lanza el error si lo necesitas
  }
}
