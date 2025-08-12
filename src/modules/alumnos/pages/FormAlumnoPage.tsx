// pages/alumnos/FormAlumnoPage.tsx
"use client";

import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import CatalogSelect from "../components/Inputs/CatalogSelect";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";

export default function FormAlumnoPage() {
  const navigate = useNavigate();
  const { id } = useParams(); // id viene solo si es edición
  const isEditMode = Boolean(id);

  // 📝 Aquí luego puedes hacer fetch de datos si estás en edición
  useEffect(() => {
    if (isEditMode) {
      // TODO: Lógica para obtener el alumno por ID
      // fetchAlumno(id).then(setFormValues)
    }
  }, [isEditMode, id]);

  const schema = z.object({
    nombre: z.string().min(1, "Nombre requerido"),
    apellido: z.string().min(1, "Apellido requerido"),
    tipo_doc: z.string().min(1, "Seleccione tipo de documento"),
    numero_doc: z.string().min(5, "Número de documento inválido"),
    emailApoderado: z.string().email("Email inválido").optional(),
    telefonoApoderado: z.string().optional(),
  });

  type FormData = z.infer<typeof schema>;

  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      nombre: "",
      apellido: "",
      tipo_doc: "",
      numero_doc: "",
      emailApoderado: "",
      telefonoApoderado: "",
    },
  });

  return (
    <div className="p-6 space-y-6">
      {/* Header con botón volver */}
      <div className="flex items-center gap-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => navigate("/alumnos")}
        >
          <ArrowLeft className="h-4 w-4 mr-2" /> Volver
        </Button>
        <h1 className="text-xl font-bold">
          {isEditMode ? "Editar Alumno" : "Registrar Alumno"}
        </h1>
      </div>

      {/* Formulario */}
      <Card>
        <CardHeader>
          <CardTitle>
            {isEditMode ? "Actualizar datos" : "Datos del Alumno"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="nombre">Nombre</Label>
                <Input id="nombre" placeholder="Juan" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="apellido">Apellido</Label>
                <Input id="apellido" placeholder="Pérez" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edad">Edad</Label>
                <Input
                  id="edad"
                  type="number"
                  min="3"
                  max="20"
                  placeholder="12"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="grado">Grado</Label>
                <Input id="grado" placeholder="6to de primaria" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="emailApoderado">Email del Apoderado</Label>
                <Input
                  id="emailApoderado"
                  type="email"
                  placeholder="apoderado@email.com"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="telefonoApoderado">
                  Teléfono del Apoderado
                </Label>
                <Input id="telefonoApoderado" placeholder="999 999 999" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="telefonoApoderado">
                  Teléfono del Apoderado
                </Label>
                <CatalogSelect
                  catalogo="TIPO_DOC"
                  value={form.watch("tipo_doc")}
                  onChange={(v) => form.setValue("tipo_doc", v)}
                  label="Tipo de documento"
                />
              </div>
            </div>

            <div className="flex justify-end gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate("/alumnos")}
              >
                Cancelar
              </Button>
              <Button type="submit">
                {isEditMode ? "Actualizar" : "Guardar"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
