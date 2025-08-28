// pages/alumnos/FormAlumnoPage.tsx

import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import { useForm, type DefaultValues } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { useAlumnoById } from "../hooks/useAlumnoById";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { SelectInput } from "../components/Inputs/SelectInput";

export default function FormAlumnoPage() {
  const navigate = useNavigate();
  const { id } = useParams(); // id viene solo si es edición
  const isEditMode = Boolean(id);
  const { data: alumno } = useAlumnoById(id);

  const schema = z.object({
    nombres: z.string().min(1, "Nombre requerido"),
    apellido_paterno: z.string().min(1, "Apellido Paterno requerido"),
    apellido_materno: z.string().min(1, "Apellido Materno requerido"),
    tipo_documento: z.string().min(1, "Seleccione tipo de documento"),
    genero: z.string().min(1, "Seleccione género"),
    grado_id: z.string().min(1, "Seleccione grado"),
    seccion_id: z.string().min(1, "Seleccione sección"),
    numero_documento: z.string().min(5, "Número de documento inválido"),
    email: z.string().email("Email inválido").optional().or(z.literal("")),
  });

  type FormData = z.infer<typeof schema>;

  const DEFAULTS: DefaultValues<FormData> = {
    nombres: "",
    apellido_paterno: "",
    apellido_materno: "",
    // RHF permite undefined en defaultValues (via DefaultValues/DeepPartial)
    tipo_documento: "",
    genero: "",
    grado_id: "",
    seccion_id: "",
    numero_documento: "",
    email: "",
  };

  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: DEFAULTS,
  });

  // ...
  useEffect(() => {
    if (!id) form.reset(DEFAULTS); // /new -> limpia todo
  }, [id]);

  useEffect(() => {
    if (alumno) {
      form.reset({
        // ...DEFAULTS,
        nombres: alumno.nombres,
        apellido_paterno: alumno.apellido_paterno,
        apellido_materno: alumno.apellido_materno,
        tipo_documento: String(alumno.tipo_documento?.id ?? ""),
        genero: String(alumno.genero?.id ?? ""),
        grado_id: String(alumno.grado_id),
        seccion_id: String(alumno.seccion_id),
        numero_documento: alumno.numero_documento ?? "",
        email: alumno.email,
      });

      // console.log("form.getValues(): ", form.getValues());
    }
  }, [alumno]);

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
                  name="numero_documento"
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

                <SelectInput
                  control={form.control}
                  name="tipo_documento"
                  catalogo="TIPO_DOC"
                  label="Tipo de documento"
                />

                <SelectInput
                  control={form.control}
                  name="genero"
                  catalogo="GENERO"
                  label="Género"
                />

                {/* <SelectInput
                  control={form.control}
                  name="seccion_id"
                  catalogo="SECCION"
                  label="Sección"
                />
                <SelectInput
                  control={form.control}
                  name="grado_id"
                  catalogo="GRADO"
                  label="Grado"
                /> */}
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
