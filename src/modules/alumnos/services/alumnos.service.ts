import { supabase } from "@/lib/supabase";
import type { Alumno } from "../pages/AlumnosPage";

export type GetAlumnosResponse = {
  data: Alumno[] | null;
  total: number;
};

export const getAlumnos = async () => {
  // const from = (page - 1) * pageSize;
  // const to = from + pageSize - 1;

  const { data, error } = await supabase.from("alumnos").select(`
    *,
     tipo_documento (
      nombre
    ),genero_id (
      nombre
    ),estado_id (
      nombre
    ),grado_id (
      nombre
    ),seccion_id (
      nombre
    )
  `);
  // .order("created_at");
  // .range(from, to);

  if (error) throw error;

  return data;
  // total: count ?? 0,
};

export async function getAlumnoById(id: string) {
  const { data, error } = await supabase
    .from("alumnos")
    .select("*")
    .eq("id", id)
    .single();

  if (error) throw error;
  return data;
}

export async function saveAlumno(data: Alumno, id?: string) {
  if (id) {
    // Update
    const { error } = await supabase.from("alumnos").update(data).eq("id", id);
    if (error) throw error;
  } else {
    // Insert
    const { error } = await supabase.from("alumnos").insert([data]);
    if (error) throw error;
  }
}

// export const getAlumnoById = async (id: string): Promise<Alumno | null> => {
//   const { data, error } = await supabase
//     .from<Alumno>("alumnos")
//     .select("*")
//     .eq("id", id)
//     .single();

//   if (error) throw error;
//   return data;
// };

// export const crearAlumno = async (alumno: Partial<Alumno>): Promise<Alumno> => {
//   const { data, error } = await supabase
//     .from<Alumno>("alumnos")
//     .insert(alumno)
//     .single();

//   if (error) throw error;
//   return data;
// };

// export const editarAlumno = async (
//   id: string,
//   alumno: Partial<Alumno>
// ): Promise<Alumno> => {
//   const { data, error } = await supabase
//     .from<Alumno>("alumnos")
//     .update(alumno)
//     .eq("id", id)
//     .single();

//   if (error) throw error;
//   return data;
// };

// export const eliminarAlumno = async (id: string): Promise<void> => {
//   const { error } = await supabase.from("alumnos").delete().eq("id", id);

//   if (error) throw error;
// };
