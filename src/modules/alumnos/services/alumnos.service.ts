import { supabase } from "@/lib/supabase";
import type { Alumno } from "../pages/AlumnosPage";

export type GetAlumnosResponse = {
  data: Alumno[] | null;
  total: number;
};

export const getAlumnos = async () => {
  try {
    const response = await fetch(`${import.meta.env.BASE_URL}/users`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        // Authorization: `Bearer ${token}`, // 👈 si necesitas token
      },
    });

    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error al traer usuarios:", error);
    throw error;
  }
};

export async function getAlumnoById(id: string) {
  try {
    const response = await fetch(`${import.meta.env.BASE_URL}/users/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(
        `Error ${response.status}: No se pudo obtener el usuario`
      );
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error al traer usuario:", error);
    throw error;
  }
}

export async function createAlumno(alumno: Alumno) {
  const { data, error } = await supabase
    .from("alumnos")
    .insert([alumno])
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function updateAlumno(id: string, alumno: Alumno) {
  const { data, error } = await supabase
    .from("alumnos")
    .update(alumno)
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;
  return data;
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
