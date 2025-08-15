import { AlumnosStats } from "../components/AlumnosStats";
import { TablaAlumnos } from "../components/TablaAlumnos";
import { useAlumnos } from "../hooks/useAlumnos";

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
  tipo_documento: string;
  genero_id: string;
  estado_id: string;
  grado_id: string;
  seccion_id: string;
  // otras propiedades que quieras
};

// -----------------------------
// Component
// -----------------------------
export default function AlumnosPage() {
  const query = useAlumnos();
  return (
    <div className="flex flex-col gap-4">
      <AlumnosStats />
      <TablaAlumnos data={query.data ?? []} />
    </div>
  );
}
