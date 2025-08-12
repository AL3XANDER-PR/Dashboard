import { AlumnosStats } from "../components/AlumnosStats";
import { TablaAlumnos } from "../components/TablaAlumnos";
import { getAlumnos } from "../services/alumnos.service";
import { useQuery } from "@tanstack/react-query";

// -----------------------------
// Types
// -----------------------------
export type Alumno = {
  id: string;
  nombres: string;
  apellido_paterno: string;
  apellido_materno: string;
  email?: string;
  grado?: string;
  seccion?: string;
  estado?: "Activo" | "Inactivo";
  img?: string; // url opcional
  // otras propiedades que quieras
};

// -----------------------------
// Component
// -----------------------------
export default function AlumnosPage() {
  const query = useQuery({ queryKey: ["alumnoss"], queryFn: getAlumnos });
  console.log("💻 - AlumnosPage - query:", query);

  return (
    <div className="flex flex-col gap-4">
      <AlumnosStats />
      <TablaAlumnos data={query?.data ?? []} />
    </div>
  );
}
