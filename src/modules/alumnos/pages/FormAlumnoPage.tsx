// pages/alumnos/FormAlumnoPage.tsx

import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import CatalogSelect from "../components/Inputs/CatalogSelect";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { useAlumnoById } from "../hooks/useAlumnoById";
import { useSaveAlumno } from "../hooks/useSaveAlumno";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

export default function FormAlumnoPage() {
  const navigate = useNavigate();
  const { id } = useParams(); // id viene solo si es edición
  const isEditMode = Boolean(id);
  const { data: alumno } = useAlumnoById(id);
  const saveAlumno = useSaveAlumno(id);

  // 📝 Aquí luego puedes hacer fetch de datos si estás en edición
  useEffect(() => {
    if (isEditMode) {
      // TODO: Lógica para obtener el alumno por ID
      // fetchAlumno(id).then(setFormValues)
    }
  }, [isEditMode, id]);

  const schema = z.object({
    nombres: z.string().min(1, "Nombre requerido"),
    apellido_paterno: z.string().min(1, "Apellido Paterno requerido"),
    apellido_materno: z.string().min(1, "Apellido Materno requerido"),
    tipo_documento: z.string().min(1, "Seleccione tipo de documento"),
    genero_id: z.string().min(1, "Seleccione tipo de documento"),
    grado_id: z.string().min(1, "Seleccione tipo de documento"),
    seccion_id: z.string().min(1, "Seleccione tipo de documento"),
    numero_doc: z.string().min(5, "Número de documento inválido"),
    email: z.string().email("Email inválido").optional(),
  });

  type FormData = z.infer<typeof schema>;

  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      nombres: "",
      apellido_paterno: "",
      apellido_materno: "",
      tipo_documento: "",
      genero_id: "",
      grado_id: "",
      seccion_id: "",
      numero_doc: "",
      email: "",
    },
  });

  useEffect(() => {
    console.log("💻 - FormAlumnoPage - alumno:", alumno);
    if (alumno) {
      form.reset(alumno);
    }
  }, [alumno, form]);

  function onSubmit(data: FormData) {
    console.log("💻 - onSubmit - data:", data);
  }

  return (
    <div className="p-6 space-y-6">
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

      <Card>
        <CardHeader>
          <CardTitle>
            {isEditMode ? "Actualizar datos" : "Datos del Alumno"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="nombres"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nombre</FormLabel>
                      <FormControl>
                        <Input placeholder="Nombre" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="apellido_paterno"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Apellido</FormLabel>
                      <FormControl>
                        <Input placeholder="Apellido" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="apellido_materno"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Apellido</FormLabel>
                      <FormControl>
                        <Input placeholder="Apellido" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="tipo_documento"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tipo de documento</FormLabel>
                      <CatalogSelect
                        catalogo="TIPO_DOC"
                        value={field.value}
                        onChange={field.onChange}
                      />
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="numero_doc"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Número documento</FormLabel>
                      <FormControl>
                        <Input placeholder="Número documento" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="Email" type="email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="genero_id"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Genero</FormLabel>
                      <CatalogSelect
                        catalogo="GENERO"
                        value={field.value}
                        onChange={field.onChange}
                        // placeholder="Seleccione tipo de documento"
                      />
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="grado_id"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Grado</FormLabel>
                      <CatalogSelect
                        catalogo="GRADO"
                        value={field.value}
                        onChange={field.onChange}
                        // placeholder="Seleccione tipo de documento"
                      />
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="seccion_id"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Seccion</FormLabel>
                      <CatalogSelect
                        catalogo="SECCION"
                        value={field.value}
                        onChange={field.onChange}
                        // placeholder="Seleccione tipo de documento"
                      />
                      <FormMessage />
                    </FormItem>
                  )}
                />
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
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
