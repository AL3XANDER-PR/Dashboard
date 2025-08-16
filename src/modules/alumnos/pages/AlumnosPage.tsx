import { lazy, Suspense } from "react";
import { useAlumnos } from "../hooks/useAlumnos";

// -----------------------------
// Types
// -----------------------------
export type Alumno = {
  id: string;
  codigo: string;
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

const TablaAlumnos = lazy(
  () => import("@/modules/alumnos/components/TablaAlumnos")
);
const AlumnosStats = lazy(
  () => import("@/modules/alumnos/components/AlumnosStats")
);

// -----------------------------
// Component
// -----------------------------
export default function AlumnosPage() {
  const query = useAlumnos();
  return (
    <div className="flex flex-col gap-4">
      <Suspense fallback={<div>Cargando tabla...</div>}>
        <AlumnosStats />
        <TablaAlumnos data={query.data ?? []} />
      </Suspense>
    </div>
  );
}
